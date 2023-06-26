import { IsNotEmpty, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreateProductBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  imagesUrl?: string;
}
