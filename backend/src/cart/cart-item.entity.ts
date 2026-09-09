import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "../products/product.entity";

@Entity("cart_items")
@Unique(["cart", "product", "reservationDate"])
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cartId" })
  cart!: Cart;

  @Column()
  cartId!: string;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column()
  productId!: string;

  @Column()
  quantity!: number;

  @Column({ type: "date", nullable: true })
  reservationDate!: string | null;
}
