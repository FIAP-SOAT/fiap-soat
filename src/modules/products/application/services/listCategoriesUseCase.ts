import { Category } from '@modules/products/domain/category';
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../ports/categoriesRepository';

interface IResponse {
  categories: Category[];
}

@Injectable()
export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<IResponse> {
    const categories = await this.categoriesRepository.listAll();

    return { categories };
  }
}
