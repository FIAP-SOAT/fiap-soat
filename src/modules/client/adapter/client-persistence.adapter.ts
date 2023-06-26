import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/adapter/database/prisma/prisma.service';
import { ClientPersistencePort } from '../applications/ports/client-persistence.port';
import { Client } from '../domain/client';

@Injectable()
export class ClientPersistenceAdapter implements ClientPersistencePort {
  constructor(private prisma: PrismaService) {}

  async persistClient(client: Client) {
    const entity = (await this.prisma.client.create({
      data: client,
    })) as Client;

    return entity;
  }
}
