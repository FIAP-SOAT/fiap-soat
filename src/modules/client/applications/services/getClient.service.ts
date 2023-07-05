import { Injectable, NotFoundException } from '@nestjs/common';
import { GetClientUseCase } from './getClientUseCase';
import { ClientRepository } from '../ports/clientRepository';
import { GetClientCommand } from './getClientCommand';

@Injectable()
export class GetClientService implements GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async getClient(command: GetClientCommand) {
    const client = this.clientRepository.findByCpf(command.cpf);

    if (!client) {
      return new NotFoundException('Client not found');
    }

    return client;
  }
}
