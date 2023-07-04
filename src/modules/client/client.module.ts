import { Module } from '@nestjs/common';
import { ClientController } from './adapter/client.controller';
import { SaveClientUseCase } from './applications/ports/saveClient.use-case';
import { SaveClientService } from './applications/services/save-client.service';
import { ClientPersistencePort } from './applications/ports/clientRepository.port';
import { ClientPersistenceAdapter } from './adapter/client-persistence.adapter';
import { DatabaseModule } from '@shared/adapter/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [
    {
      provide: SaveClientUseCase,
      useClass: SaveClientService,
    },
    {
      provide: ClientPersistencePort,
      useClass: ClientPersistenceAdapter,
    },
  ],
})
export class ClientModule {}
