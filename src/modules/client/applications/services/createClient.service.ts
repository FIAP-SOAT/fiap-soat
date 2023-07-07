import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientUseCase } from './createClientUseCase';
import { ClientRepository } from '../ports/clientRepository';
import { CreateClientCommand } from './createClientCommand';

@Injectable()
export class CreateClientService implements CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async saveClient(command: CreateClientCommand) {
    const clientAlreadyExist = await this.clientRepository.findByEmail(
      command.email,
    );

    if (clientAlreadyExist) {
      throw new BadRequestException('Cliente já cadastrado');
    }

    return this.clientRepository.persistClient(command);
  }
}
