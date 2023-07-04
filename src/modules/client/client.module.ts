import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { ClientController } from './adapter/http/controllers/createClient.controller';
import { CreateClientUseCase } from './applications/services/createClientUseCase';
import { CreateClientService } from './applications/services/createClient.service';
import { ClientRepository } from './applications/ports/clientRepository';
import { ClientPersistenceAdapter } from './adapter/persistance/database/prisma/repositories/primaClientRepository';
import { GetClientController } from './adapter/http/controllers/getClient.controller';
import { GetClientUseCase } from './applications/services/getClientUseCase';
import { GetClientService } from './applications/services/getClient.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController, GetClientController],
  providers: [
    {
      provide: CreateClientUseCase,
      useClass: CreateClientService,
    },
    {
      provide: ClientRepository,
      useClass: ClientPersistenceAdapter,
    },
    {
      provide: GetClientUseCase,
      useClass: GetClientService,
    },
  ],
})
export class ClientModule {}
