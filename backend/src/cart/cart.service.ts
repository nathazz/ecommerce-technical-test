import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./cart.entity";
import { CartItem } from "./cart-item.entity";
import { ProductsService } from "../products/products.service";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    private readonly productsService: ProductsService,
  ) {}

  private async getOrCreateCart(cartId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { cartId },
      relations: {
        items: {
          product: true,
        },
      },
    });

    if (!cart) {
      cart = this.cartRepository.create({
        cartId,
        items: [],
      });

      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async getCart(cartId: string) {
    const cart = await this.getOrCreateCart(cartId);

    return this.buildCartResponse(cart.items);
  }

  async addItem(
    cartId: string,
    productId: string,
    quantity: number,
    reservationDate?: string,
  ) {
    const product = await this.productsService.findOneEntity(productId);

    if (product.stock < quantity) {
      throw new BadRequestException(
        `stock insuficiente para "${product.name}". Disponível: ${product.stock}.`,
      );
    }

    const cart = await this.getOrCreateCart(cartId);

    const normalizedReservationDate = reservationDate || null;

    const existingItem = cart.items.find(
      (item) =>
        item.productId === productId &&
        this.sameReservationDate(
          item.reservationDate,
          normalizedReservationDate,
        ),
    );
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestException(
          `stock insuficiente para "${product.name}". Disponível: ${product.stock}.`,
        );
      }

      existingItem.quantity = newQuantity;

      await this.cartItemRepository.save(existingItem);
    } else {
      const cartItem = this.cartItemRepository.create({
        cart,
        cartId: cart.id,
        product,
        productId: product.id,
        quantity,
        reservationDate: normalizedReservationDate,
      });

      await this.cartItemRepository.save(cartItem);

      cart.items.push(cartItem);
    }

    return this.getCart(cartId);
  }

  async updateItem(cartId: string, itemId: string, quantity: number) {
    const cart = await this.getOrCreateCart(cartId);

    const item = cart.items.find((cartItem) => cartItem.id === itemId);

    if (!item) {
      throw new NotFoundException("Item não encontrado no carrinho.");
    }

    if (item.product.stock < quantity) {
      throw new BadRequestException(
        `stock insuficiente para "${item.product.name}". Disponível: ${item.product.stock}.`,
      );
    }

    item.quantity = quantity;

    await this.cartItemRepository.save(item);

    return this.getCart(cartId);
  }

  async removeItem(cartId: string, itemId: string) {
    const cart = await this.getOrCreateCart(cartId);

    const item = cart.items.find((cartItem) => cartItem.id === itemId);

    if (!item) {
      throw new NotFoundException("Item não encontrado no carrinho.");
    }

    await this.cartItemRepository.remove(item);

    return this.getCart(cartId);
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.getOrCreateCart(cartId);

    if (cart.items.length === 0) {
      return;
    }

    await this.cartItemRepository.remove(cart.items);
  }

  private buildCartResponse(items: CartItem[]) {
    const cartItems = items.map((item) => {
      const price = Number(item.product.price);

      return {
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
        reservationDate: item.reservationDate,
        subtotal: Number((price * item.quantity).toFixed(2)),
      };
    });

    const total = Number(
      cartItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
    );

    return {
      cartItems,
      total,
    };
  }

  private sameReservationDate(
    first: string | null,
    second: string | null,
  ): boolean {
    if (!first && !second) {
      return true;
    }

    if (!first || !second) {
      return false;
    }

    return first === second;
  }
}
