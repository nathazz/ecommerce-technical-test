import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ProductType {
  STANDARD = "standard",
  BOOKING = "booking", 
}

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;

  @Column({ default: 0 })
  stock!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ type: "enum", enum: ProductType, default: ProductType.STANDARD })
  type!: ProductType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
