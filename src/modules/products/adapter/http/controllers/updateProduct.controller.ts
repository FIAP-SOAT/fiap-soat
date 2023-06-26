import { UpdateProductUseCase } from '@modules/products/application/services/updateProductUseCase';
import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateProductBody } from '../requests/updateProductBody';
import { ProductViewModel } from '../viewModels/productViewModel';

@Controller('products')
export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  @Patch()
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
