import { Category } from '@modules/products/domain/category';
import { InMemoryProductsRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryProductsRepository';
import { InMemoryCategoriesRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryCategoriesRepository';
import { CreateProductUseCase } from './createProductUseCase';

let createProductUseCase: CreateProductUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();

    createProductUseCase = new CreateProductUseCase(
      inMemoryCategoriesRepository,
      inMemoryProductsRepository,
    );
  });

  it('should be able to create a new product', async () => {
    const category = new Category({
      name: 'cat1',
    });
    await inMemoryCategoriesRepository.create(category);

    const { product } = await createProductUseCase.execute({
      name: 'Prod1',
      description: 'Desc',
      price: 50,
      categoryId: category.id,
      imagesUrl: 'https://foo.bar',
    });

    expect(product).toBeTruthy();
    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a product with invalid category', async () => {
    expect(async () => {
      await createProductUseCase.execute({
        name: 'Prod1',
        description: 'Desc',
        price: 50,
        categoryId: 'NA',
        imagesUrl: 'https://foo.bar',
      });
    }).rejects.toThrow('Product Category does not exist.');
  });
});
