import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../products/product.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @Column()
  orderId!: string;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "productId" })
  product!: Product | null;

  @Column({ nullable: true })
  productId!: string | null;

  @Column()
  productName!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;

  @Column()
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal!: string;

  @Column({ type: "date", nullable: true })
  reservationDate!: string | null;
}
