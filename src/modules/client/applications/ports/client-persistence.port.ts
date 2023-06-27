import { Client } from '@modules/client/domain/client';

export abstract class ClientPersistencePort {
  abstract persistClient(client: Client): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
}
