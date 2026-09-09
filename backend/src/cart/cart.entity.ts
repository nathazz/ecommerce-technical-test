import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  cartId!: string;

  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
  })
  items!: CartItem[];

  @CreateDateColumn()
  createdAt!: Date;
}
