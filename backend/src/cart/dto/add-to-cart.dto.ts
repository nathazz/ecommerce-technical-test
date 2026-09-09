import { IsDateString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
  @IsUUID('4', { message: 'produtoId deve ser um UUID válido.' })
  productId!: string;

  @IsInt({ message: 'quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'quantidade deve ser pelo menos 1.' })
  quantity!: number;

  @IsOptional()
  @IsDateString({}, { message: 'deve ser uma data ISO válida.' })
  reservationDate?: string;
}
