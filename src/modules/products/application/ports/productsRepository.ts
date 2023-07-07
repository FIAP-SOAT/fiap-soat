import { Product } from '@modules/products/domain/product';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product>;
  abstract save(product: Product): Promise<void>;
  abstract listByCategory(categoryId: string): Promise<Product[]>;
}
