import { InMemoryCategoriesRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryCategoriesRepository';
import { InMemoryProductsRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryProductsRepository';
import { Category } from '@modules/products/domain/category';
import { makeProduct } from '@modules/products/domain/factories/ProductFactory';
import { UpdateProductUseCase } from './updateProductUseCase';

let updateProductUseCase: UpdateProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe('Update Product', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();

    updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductsRepository,
      inMemoryCategoriesRepository,
    );
  });

  it("should be able to update a product's data", async () => {
    const prod = makeProduct();

    await inMemoryProductsRepository.create(prod);

    const { product } = await updateProductUseCase.execute({
      id: prod.id,
      name: 'updated name',
      price: 27,
    });

    expect(product.name).toBe('updated name');
    expect(product.price).toBe(27);
  });

  it("should be able to update a product's category", async () => {
    const cat1 = new Category({ name: 'cat1' });
    await inMemoryCategoriesRepository.create(cat1);
    const cat2 = new Category({ name: 'cat2' });
    await inMemoryCategoriesRepository.create(cat2);

    const prod = makeProduct({ category: cat1 });

    await inMemoryProductsRepository.create(prod);

    const { product } = await updateProductUseCase.execute({
      id: prod.id,
      categoryId: cat2.id,
    });

    expect(product.category.id).toBe(cat2.id);
  });

  it('should not be able to update a product to a non-existent category', async () => {
    expect(async () => {
      const prod = makeProduct();

      await inMemoryProductsRepository.create(prod);

      await updateProductUseCase.execute({
        id: prod.id,
        categoryId: 'fakeID',
      });
    }).rejects.toThrow('Product Category does not exist.');
  });

  it('should not be able to update a non-existent product', async () => {
    expect(async () => {
      await updateProductUseCase.execute({
        id: 'prodId',
        categoryId: 'fakeID',
      });
    }).rejects.toThrow('Product not found.');
  });
});
