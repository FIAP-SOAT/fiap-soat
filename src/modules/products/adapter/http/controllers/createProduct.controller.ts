import { CreateProductUseCase } from '@modules/products/application/services/createProductUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductBody } from '../requests/createProductBody';
import { ProductViewModel } from '../viewModels/productViewModel';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Product Category does not exist.' })
  async create(@Body() body: CreateProductBody) {
    const { name, description, price, categoryId, imagesUrl } = body;

    const { product } = await this.createProductUseCase.execute({
      name,
      description,
      price,
      categoryId,
      imagesUrl,
    });

    return { product: ProductViewModel.toHTTP(product) };
  }
}
