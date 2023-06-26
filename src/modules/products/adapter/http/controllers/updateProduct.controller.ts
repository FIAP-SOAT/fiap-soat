import { UpdateProductUseCase } from '@modules/products/application/services/updateProductUseCase';
import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateProductBody } from '../requests/updateProductBody';
import { ProductViewModel } from '../viewModels/productViewModel';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  @Patch()
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({
    status: 400,
    description: 'Product not found or Product Category does not exist',
  })
  async update(@Body() body: UpdateProductBody) {
    const { id, name, description, price, categoryId, imagesUrl } = body;

    const { product } = await this.updateProductUseCase.execute({
      id,
      name,
      description,
      price,
      categoryId,
      imagesUrl,
    });

    return { product: ProductViewModel.toHTTP(product) };
  }
}
