import { CategoriesRepository } from '@modules/products/application/ports/categoriesRepository';
import { Category } from '@modules/products/domain/category';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  categories: Category[] = [];

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);

    if (!category) {
      return null;
    }

    return category;
  }

  async listAll(): Promise<Category[]> {
    return this.categories;
  }

  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
