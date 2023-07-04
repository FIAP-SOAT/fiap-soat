import { InMemoryProductsRepository } from '@modules/products/adapter/persistance/inMemory/inMemoryProductsRepository';
import { CreateOrderUseCase } from './createOrderUseCase';
import { InMemoryOrdersRepository } from '@modules/orders/adapter/persistance/inMemory/inMemoryOrdersRepository';
import { randomUUID } from 'node:crypto';
import { makeProduct } from '@modules/products/domain/factories/ProductFactory';
import { InMemoryClientsRepository } from '@modules/client/adapter/persistance/inMemory/inMemoryClientsRepository';

let createOrderUseCase: CreateOrderUseCase;
let inMemoryClientsRepository: InMemoryClientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;

const client = {
  id: randomUUID(),
  cpf: '12345678912',
  email: 'email@example.com',
  name: 'Client',
  createdAt: new Date(),
};

describe('Create Sale', () => {
  beforeEach(async () => {
    inMemoryClientsRepository = new InMemoryClientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();

    createOrderUseCase = new CreateOrderUseCase(
      inMemoryClientsRepository,
      inMemoryProductsRepository,
      inMemoryOrdersRepository,
    );

    await inMemoryClientsRepository.persistClient(client);
  });

  it('should be able to create a sale', async () => {
    const prod1 = makeProduct({ price: 10 });
    const prod2 = makeProduct({ price: 5 });
    await inMemoryProductsRepository.create(prod1);
    await inMemoryProductsRepository.create(prod2);

    const { order } = await createOrderUseCase.execute({
      clientId: client.id,
      products: [
        {
          amount: 5,
          id: prod1.id,
        },
        {
          amount: 2,
          id: prod2.id,
        },
      ],
    });

    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id');
    expect(order.fullPrice).toBe(60);
  });

  it('should not be able to create a sale with a non-existent customer', async () => {
    const prod1 = makeProduct({ price: 10 });
    await inMemoryProductsRepository.create(prod1);

    expect(async () => {
      await createOrderUseCase.execute({
        clientId: 'clientId',
        products: [
          {
            amount: 5,
            id: prod1.id,
          },
        ],
      });
    }).rejects.toThrow('Client not found.');
  });

  it('should not be able to create a sale with a non-existent product ', async () => {
    expect(async () => {
      await createOrderUseCase.execute({
        clientId: client.id,
        products: [
          {
            amount: 2,
            id: 'prodId',
          },
        ],
      });
    }).rejects.toThrow('Product not found.');
  });
});
