import { ProductType } from "../product.entity";

export class ProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  imageUrl!: string;
  type!: ProductType;
}
