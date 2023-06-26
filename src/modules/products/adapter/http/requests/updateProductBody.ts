import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id do produto a ser editado',
  })
  id: string;

  @IsOptional()
  @ApiProperty({
    example: 'Coca-Cola',
    description: 'Nome do produto',
    required: false,
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    example: 'Bebida gaseificada de cola',
    description: 'Descrição do produto',
    required: false,
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    example: 6.99,
    description: 'Preço do produto',
    required: false,
  })
  price: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id da categoria do produto',
    required: false,
  })
  categoryId: string;

  @IsOptional()
  @ApiProperty({
    example: 'https://www.example.com',
    description: 'Link com as imagens do produto',
    required: false,
  })
  imagesUrl: string;
}
