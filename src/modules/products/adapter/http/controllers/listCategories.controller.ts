import { ListCategoriesUseCase } from '@modules/products/application/services/listCategoriesUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CategoryViewModel } from '../viewModels/categoryViewModel';

@Controller('products/categories')
@ApiTags('product categories')
export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success listing categories' })
  async list() {
    const { categories } = await this.listCategoriesUseCase.execute();

    return { categories: categories.map(CategoryViewModel.toHTTP) };
  }
}
