import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { ClientController } from './adapter/http/controllers/createClient.controller';
import { CreateClientUseCase } from './applications/services/createClientUseCase';
import { CreateClientService } from './applications/services/createClient.service';
import { ClientRepository } from './applications/ports/clientRepository';
import { ClientPersistenceAdapter } from './adapter/persistance/database/prisma/repositories/primaClientRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    {
      provide: CreateClientUseCase,
      useClass: CreateClientService,
    },
    {
      provide: ClientRepository,
      useClass: ClientPersistenceAdapter,
    },
  ],
})
export class ClientModule {}
