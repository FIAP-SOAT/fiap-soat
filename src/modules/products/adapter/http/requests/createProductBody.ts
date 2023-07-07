import { IsNotEmpty, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBody {
  @IsNotEmpty()
  @ApiProperty({ example: 'Coca-Cola', description: 'Nome do produto' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Bebida gaseificada de cola',
    description: 'Descrição do produto',
  })
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ example: 6.99, description: 'Preço do produto' })
  price: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id da categoria do produto',
  })
  categoryId: string;

  @IsOptional()
  @ApiProperty({
    example: 'https://www.example.com',
    description: 'Link com as imagens do produto',
  })
  imagesUrl?: string;
}
