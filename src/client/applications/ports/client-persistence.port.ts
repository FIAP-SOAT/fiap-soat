import { Client } from 'src/client/domain/client';

export abstract class ClientPersistencePort {
  abstract persistClient(client: Client): Promise<Client>;
}
