import { Client } from '@modules/client/domain/client';

export class ClientViewModel {
  static toHTTP(client: Client) {
    return {
      id: client.id,
      name: client.name,
    };
  }
}
