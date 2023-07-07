import { InMemoryCategoriesRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryCategoriesRepository';
import { ListCategoriesUseCase } from './listCategoriesUseCase';
import { Category } from '@modules/products/domain/category';

let listCategoriesUseCase: ListCategoriesUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe('List Categories', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    listCategoriesUseCase = new ListCategoriesUseCase(
      inMemoryCategoriesRepository,
    );
  });

  it('should be able to list all product categories', async () => {
    await inMemoryCategoriesRepository.create(new Category({ name: 'Desert' }));
    await inMemoryCategoriesRepository.create(new Category({ name: 'Drink' }));

    const { categories } = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(2);
  });
});
