import { Injectable } from '@nestjs/common';
import { GetClientUseCase } from '../ports/getClient.useCase';
import { ClientPersistencePort } from '../ports/clientRepository.port';

@Injectable()
export class GetClientService implements GetClientUseCase {
  constructor(private clientPersistencePort: ClientPersistencePort) {}

  async findByCpf(cpf: string) {
    this.clientPersistencePort.findByCpf(cpf);
  }
}
