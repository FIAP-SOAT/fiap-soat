import { Client } from '@modules/client/domain/client';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GetClientCommand } from './getClientCommand';

export abstract class GetClientUseCase {
  abstract getClient(
    command: GetClientCommand,
  ): Promise<Client | BadRequestException | NotFoundException>;
}
