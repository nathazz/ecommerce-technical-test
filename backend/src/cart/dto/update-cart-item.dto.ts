import { IsInt, IsUUID, Min } from "class-validator";

import { Type } from "class-transformer";

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity!: number;
}
