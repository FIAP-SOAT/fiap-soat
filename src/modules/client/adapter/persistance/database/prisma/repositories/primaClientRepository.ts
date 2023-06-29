import { ClientRepository } from '@modules/client/applications/ports/clientRepository';
import { Client } from '@modules/client/domain/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/adapter/database/prisma/prisma.service';

@Injectable()
export class ClientPersistenceAdapter implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async persistClient(client: Client) {
    const entity = (await this.prisma.client.create({
      data: client,
    })) as Client;

    return entity;
  }

  async findById(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return null;
    }

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!client) {
      return null;
    }

    return client;
  }
}
