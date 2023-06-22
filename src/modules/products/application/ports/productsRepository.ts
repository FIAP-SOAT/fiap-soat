import { Product } from '@modules/products/domain/product';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
}
