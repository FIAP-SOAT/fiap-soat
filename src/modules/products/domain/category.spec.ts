import { Category } from './category';

describe('Product Category', () => {
  it('should be able to create a new product category', () => {
    const category = new Category({
      name: 'category',
    });

    expect(category).toBeTruthy();
  });
});
