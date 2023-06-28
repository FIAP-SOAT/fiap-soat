import { Client } from '@modules/client/domain/client';

export class CreateClientViewModel {
  static toHTTP(client: Client) {
    const { id, cpf, name, email } = client;

    return { id, cpf, name, email };
  }
}
