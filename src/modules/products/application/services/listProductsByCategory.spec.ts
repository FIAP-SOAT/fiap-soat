import { InMemoryProductsRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryProductsRepository';
import { ListProductsByCategoryUseCase } from './listProductsByCategoryUseCase';
import { InMemoryCategoriesRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryCategoriesRepository';
import { Category } from '@modules/products/domain/category';
import { makeProduct } from '@modules/products/domain/factories/ProductFactory';

let listProductsByCategoryUseCase: ListProductsByCategoryUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe('List Products', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
      inMemoryCategoriesRepository,
      inMemoryProductsRepository,
    );
  });

  it('should be able to list products by category id', async () => {
    const category = new Category({
      name: 'cat1',
    });
    await inMemoryCategoriesRepository.create(category);

    await inMemoryProductsRepository.create(
      makeProduct({
        category,
      }),
    );
    await inMemoryProductsRepository.create(
      makeProduct({
        category,
      }),
    );

    await inMemoryProductsRepository.create(
      makeProduct({
        category: new Category({
          name: 'cat2',
        }),
      }),
    );
    await inMemoryProductsRepository.create(
      makeProduct({
        category: new Category({
          name: 'cat3',
        }),
      }),
    );

    const { products } = await listProductsByCategoryUseCase.execute({
      categoryId: category.id,
    });

    expect(products).toHaveLength(2);
  });
});
