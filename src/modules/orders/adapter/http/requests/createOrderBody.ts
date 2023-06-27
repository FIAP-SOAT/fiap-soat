import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ProductBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id do produto',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: 'Quantidade do produto no pedido',
  })
  amount: number;
}

export class CreateOrderBody {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id do cliente',
  })
  clientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => ProductBody)
  @ApiProperty({
    isArray: true,
    type: ProductBody,
    description: 'Produtos',
  })
  products: ProductBody[];
}
