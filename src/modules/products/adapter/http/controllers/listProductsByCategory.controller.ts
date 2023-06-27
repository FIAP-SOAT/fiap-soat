import { ListProductsByCategoryUseCase } from '@modules/products/application/services/listProductsByCategoryUseCase';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductViewModel } from '../viewModels/productViewModel';

@Controller('products')
@ApiTags('products')
export class ListProductsByCategoryController {
  constructor(
    private listProductsByCategoryUseCase: ListProductsByCategoryUseCase,
  ) {}

  @Get('/:categoryId')
  @ApiResponse({
    status: 200,
    description: 'Success listing products by category.',
  })
  @ApiResponse({
    status: 400,
    description: 'Product Category does not exist.',
  })
  async list(@Param('categoryId') categoryId: string) {
    const { products } = await this.listProductsByCategoryUseCase.execute({
      categoryId,
    });

    return { products: products.map(ProductViewModel.toHTTP) };
  }
}
