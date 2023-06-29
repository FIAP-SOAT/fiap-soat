import { Client } from '@modules/client/domain/client';

export abstract class ClientRepository {
  abstract persistClient(client: Client): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract findByEmail(email: string): Promise<Client>;
}
