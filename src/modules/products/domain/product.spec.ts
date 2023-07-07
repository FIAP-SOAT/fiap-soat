import { Category } from './category';
import { Product } from './product';

describe('Product', () => {
  it('should be able to create a product', () => {
    const product = new Product({
      name: 'Hamburguer',
      description: 'description',
      price: 10,
      imagesUrl: 'http://foo.bar',
      category: new Category({
        name: 'Drink',
      }),
    });

    expect(product).toBeTruthy();
    expect(product).toHaveProperty('id');
  });
});
