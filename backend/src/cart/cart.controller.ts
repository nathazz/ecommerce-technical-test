import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";

import { Request, Response } from "express";

import { CartService } from "./cart.service";

import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { resolveCartId } from "../common/cart-cookie.util";

@Controller("carrinho")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);

    return this.cartService.getCart(cartId);
  }

  @Post("itens")
  async addItem(
    @Body() dto: AddToCartDto,

    @Req() req: Request,

    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);

    return this.cartService.addItem(
      cartId,
      dto.productId,
      dto.quantity,
      dto.reservationDate,
    );
  }

  @Patch("itens/:itemId")
  async updateItem(
    @Param("itemId") itemId: string,
    @Body() dto: UpdateCartItemDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);

    return this.cartService.updateItem(cartId, itemId, dto.quantity);
  }

  @Delete("itens/:itemId")
  async removeItem(
    @Param("itemId") itemId: string,

    @Req() req: Request,

    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);

    return this.cartService.removeItem(cartId, itemId);
  }

  @Delete()
  async clearCart(
    @Req() req: Request,

    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);

    await this.cartService.clearCart(cartId);

    return {
      message: "Carrinho limpo com sucesso.",
    };
  }
}
