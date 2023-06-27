import { Product } from '@modules/products/domain/product';
import { CategoryViewModel } from './categoryViewModel';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: CategoryViewModel.toHTTP(product.category),
      imagesUrl: product.imagesUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
