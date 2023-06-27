import { InMemoryOrdersRepository } from '@modules/orders/adapter/persistance/inMemory/inMemoryOrdersRepository';
import { ListStatusUseCase } from './listStatusUseCase';
import { Status } from '@modules/orders/domain/status';

let listStatusUseCase: ListStatusUseCase;
let inMemoryOrdersRepository: InMemoryOrdersRepository;

describe('List Status', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();

    listStatusUseCase = new ListStatusUseCase(inMemoryOrdersRepository);
  });

  it('should be able to list all status', async () => {
    await inMemoryOrdersRepository.createStatus(
      new Status({ description: 'st1' }),
    );
    await inMemoryOrdersRepository.createStatus(
      new Status({ description: 'st2' }),
    );

    const { status } = await listStatusUseCase.execute();

    expect(status).toHaveLength(2);
  });
});
