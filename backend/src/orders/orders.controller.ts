import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { Request, Response } from "express";
import { OrdersService } from "./orders.service";

import { resolveCartId } from "../common/cart-cookie.util";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("finalizar-compra")
  finishBuy(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cartId = resolveCartId(req, res);
    return this.ordersService.finishBuy(cartId);
  }
}
