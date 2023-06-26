import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Product } from '@modules/products/domain/product';

export class InMemoryProductsRepository implements ProductsRepository {
  products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product> {
    return this.products.find((prod) => prod.id === id);
  }

  async save(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === product.id,
    );

    if (productIndex >= 0) {
      this.products[productIndex] = product;
    }
  }
}
