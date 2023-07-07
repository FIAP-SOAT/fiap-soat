import { InMemoryProductsRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryProductsRepository';
import { makeProduct } from '@modules/products/domain/factories/ProductFactory';
import { RemoveProductUseCase } from './removeProductUseCase';

let removeProductUseCase: RemoveProductUseCase;
let inMemoryProductsRepository: InMemoryProductsRepository;

describe('Remove Product', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();

    removeProductUseCase = new RemoveProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to remove a product', async () => {
    const prod = makeProduct();

    await inMemoryProductsRepository.create(prod);

    const { product } = await removeProductUseCase.execute({
      id: prod.id,
    });

    expect(product.isActive).toBe(false);
  });

  it('should not be able to remove a non-existent product', () => {
    expect(async () => {
      await removeProductUseCase.execute({
        id: 'fakeId',
      });
    }).rejects.toThrow('Product not found.');
  });
});
