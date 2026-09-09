import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

import { ProductsModule } from "./products/products.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";

import { Product } from "./products/product.entity";
import { Cart } from "./cart/cart.entity";
import { CartItem } from "./cart/cart-item.entity";
import { Order } from "./orders/order.entity";
import { OrderItem } from "./orders/order-item.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 60,
      },
    ]),

    TypeOrmModule.forRoot({
      type: "postgres",

      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,

      username: process.env.DB_USERNAME || "postgres",

      password: process.env.DB_PASSWORD || "postgres",

      database: process.env.DB_DATABASE || "ecommerce_db",

      entities: [Product, Cart, CartItem, Order, OrderItem],

      synchronize: true,
    }),

    ProductsModule,
    CartModule,
    OrdersModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
