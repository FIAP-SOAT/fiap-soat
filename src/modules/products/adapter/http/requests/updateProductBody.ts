import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateProductBody {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  imagesUrl: string;
}
