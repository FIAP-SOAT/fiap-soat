import { Category } from '../category';
import { Product, ProductProps } from '../product';

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}) {
  return new Product({
    name: 'name',
    description: 'description',
    price: 20,
    category: new Category({
      name: 'food',
    }),
    imagesUrl: 'hhtps://foo.bar',
    ...override,
  });
}
