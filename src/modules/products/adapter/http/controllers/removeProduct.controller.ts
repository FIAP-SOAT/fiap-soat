import { RemoveProductUseCase } from '@modules/products/application/services/removeProductUseCase';
import { Controller, Delete, Param } from '@nestjs/common';
import { ProductViewModel } from '../viewModels/productViewModel';

@Controller('products')
export class RemoveProductController {
  constructor(private removeProductUseCase: RemoveProductUseCase) {}

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const { product } = await this.removeProductUseCase.execute({ id });

    return { product: ProductViewModel.toHTTP(product) };
  }
}
