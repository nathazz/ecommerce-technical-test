import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductResponseDto } from "./dto/product-response.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const produtos = await this.productsRepository.find({
      order: { name: "ASC" },
    });
    return produtos.map(this.toResponseDto);
  }

  async findOneEntity(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Produto ${id} não encontrado.`);
    }

    return product;
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.findOneEntity(id);
    return this.toResponseDto(product);
  }

  private toResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      imageUrl: product.imageUrl,
      type: product.type,
    };
  }
}
