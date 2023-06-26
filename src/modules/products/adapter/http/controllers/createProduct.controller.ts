import { CreateProductUseCase } from '@modules/products/application/services/createProductUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductBody } from '../requests/createProductBody';
import { ProductViewModel } from '../viewModels/productViewModel';

@Controller('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
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
