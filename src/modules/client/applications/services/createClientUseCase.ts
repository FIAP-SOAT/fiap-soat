import { BadRequestException } from '@nestjs/common';
import { CreateClientCommand } from './createClientCommand';
import { Client } from '@modules/client/domain/client';

export abstract class CreateClientUseCase {
  abstract saveClient(
    command: CreateClientCommand,
  ): Promise<Client | BadRequestException>;
}
