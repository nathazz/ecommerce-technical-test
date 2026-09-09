import { BadRequestException, Injectable } from "@nestjs/common";

import { DataSource } from "typeorm";

import { CartService } from "../cart/cart.service";

import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";

import { Product } from "../products/product.entity";

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,

    private readonly cartService: CartService,
  ) {}

  async finishBuy(cartId: string) {
    const cart = await this.cartService.getCart(cartId);

    if (cart.cartItems.length === 0) {
      throw new BadRequestException("O carrinho está vazio.");
    }

    const order = await this.dataSource.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);
      const orderRepo = manager.getRepository(Order);

      const newOrder = new Order();

      newOrder.items = [];

      let total = 0;

      for (const item of cart.cartItems) {
        const product = await productRepo.findOne({
          where: {
            id: item.productId,
          },

          lock: {
            mode: "pessimistic_write",
          },
        });

        if (!product) {
          throw new BadRequestException(
            `Produto "${item.name}" não está mais disponível.`,
          );
        }

        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para "${product.name}". Disponível: ${product.stock}.`,
          );
        }

        product.stock -= item.quantity;

        await productRepo.save(product);

        const orderItem = new OrderItem();

        orderItem.product = product;
        orderItem.productId = product.id;
        orderItem.productName = product.name;
        orderItem.price = product.price;
        orderItem.quantity = item.quantity;
        orderItem.subtotal = (Number(product.price) * item.quantity).toFixed(2);
        orderItem.reservationDate = item.reservationDate;

        newOrder.items.push(orderItem);

        total += Number(orderItem.subtotal);
      }

      newOrder.total = total.toFixed(2);

      return orderRepo.save(newOrder);
    });

    await this.cartService.clearCart(cartId);

    return {
      orderId: order.id,
      status: order.status,
      total: Number(order.total),
      itens: order.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.subtotal),
        reservationDate: item.reservationDate,
      })),
      message: "Compra finalizada com sucesso!",
    };
  }
}
