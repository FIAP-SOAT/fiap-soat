import { Injectable } from '@nestjs/common';
import { SaveClientUseCase } from '../ports/saveClient.use-case';
import { ClientPersistencePort } from '../ports/clientRepository.port';
import { SaveClientCommand } from '../ports/saveClient.command';

@Injectable()
export class SaveClientService implements SaveClientUseCase {
  constructor(private clientPersistencePort: ClientPersistencePort) {}

  async saveClient(command: SaveClientCommand) {
    this.clientPersistencePort.persistClient(command);
  }
}
