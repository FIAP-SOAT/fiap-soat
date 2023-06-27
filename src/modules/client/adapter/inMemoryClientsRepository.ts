import { ClientPersistencePort } from '../applications/ports/client-persistence.port';
import { Client } from '../domain/client';

export class InMemoryClientsRepository implements ClientPersistencePort {
  clients: Client[] = [];

  async persistClient(client: Client): Promise<Client> {
    this.clients.push(client);

    return client;
  }

  async findById(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }
}
