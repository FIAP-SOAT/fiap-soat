import { Category } from '@modules/products/domain/category';

export abstract class CategoriesRepository {
  abstract findById(id: string): Promise<Category>;
  abstract listAll(): Promise<Category[]>;
  abstract create(category: Category): Promise<void>;
}
