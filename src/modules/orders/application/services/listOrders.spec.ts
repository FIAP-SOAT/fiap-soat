import { InMemoryOrdersRepository } from '@modules/orders/adapter/persistance/inMemory/inMemoryOrdersRepository';
import { ListOrdersUseCase } from './listOrdersUseCase';
import { Status } from '@modules/orders/domain/status';
import { Order } from '@modules/orders/domain/order';

let listOrdersUseCase: ListOrdersUseCase;
let inMemoryOrdersRepository: InMemoryOrdersRepository;

const status1 = new Status({ description: 'st1' });
const status2 = new Status({ description: 'st2' });
const status3 = new Status({ description: 'st3' });
const status4 = new Status({ description: 'st4' });

describe('List Orders', () => {
  beforeEach(async () => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();

    listOrdersUseCase = new ListOrdersUseCase(inMemoryOrdersRepository);

    await inMemoryOrdersRepository.createStatus(status1);
    await inMemoryOrdersRepository.createStatus(status2);
    await inMemoryOrdersRepository.createStatus(status3);
    await inMemoryOrdersRepository.createStatus(status4);

    await inMemoryOrdersRepository.create(
      new Order({
        fullPrice: 10,
        products: [],
        status: status1,
      }),
    );
    await inMemoryOrdersRepository.create(
      new Order({
        fullPrice: 15,
        products: [],
        status: status2,
      }),
    );
    await inMemoryOrdersRepository.create(
      new Order({
        fullPrice: 23,
        products: [],
        status: status3,
      }),
    );
    await inMemoryOrdersRepository.create(
      new Order({
        fullPrice: 89,
        products: [],
        status: status4,
      }),
    );
  });

  it('should be able to list all orders', async () => {
    const { orders } = await listOrdersUseCase.execute({});

    expect(orders).toHaveLength(4);
  });

  it('should be able to filter orders by status', async () => {
    const { orders: ordersSt1 } = await listOrdersUseCase.execute({
      status: [status1.id],
    });

    expect(ordersSt1).toHaveLength(1);

    const { orders: ordersSt1St2 } = await listOrdersUseCase.execute({
      status: [status1.id, status2.id],
    });

    expect(ordersSt1St2).toHaveLength(2);
  });
});
