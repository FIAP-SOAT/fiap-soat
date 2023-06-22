import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Product } from '@modules/products/domain/product';

export class InMemoryProductsRepository implements ProductsRepository {
  products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }
}
