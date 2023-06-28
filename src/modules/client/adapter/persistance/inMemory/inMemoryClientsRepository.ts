import { ClientRepository } from '@modules/client/applications/ports/clientRepository';
import { Client } from '@modules/client/domain/client';

export class InMemoryClientsRepository implements ClientRepository {
  clients: Client[] = [];

  async persistClient(client: Client): Promise<Client> {
    this.clients.push(client);

    return client;
  }

  async findById(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }

  async findByEmail(email: string): Promise<Client> {
    return this.clients.find((client) => client.email === email);
  }
}
