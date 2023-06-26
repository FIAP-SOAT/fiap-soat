import { RemoveProductUseCase } from '@modules/products/application/services/removeProductUseCase';
import { Controller, Delete, Param } from '@nestjs/common';
import { ProductViewModel } from '../viewModels/productViewModel';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class RemoveProductController {
  constructor(private removeProductUseCase: RemoveProductUseCase) {}

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Removed' })
  @ApiResponse({ status: 400, description: 'Product not found.' })
  async remove(@Param('id') id: string) {
    const { product } = await this.removeProductUseCase.execute({ id });

    return { product: ProductViewModel.toHTTP(product) };
  }
}
