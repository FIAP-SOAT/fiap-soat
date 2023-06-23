import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { ClientController } from './adapter/client.controller';
import { SaveClientUseCase } from './applications/ports/saveClient.use-case';
import { SaveClientService } from './applications/services/save-client.service';
import { ClientPersistencePort } from './applications/ports/client-persistence.port';
import { ClientPersistenceAdapter } from './adapter/client-persistence.adapter';

@Module({
  imports: [PrismaModule],
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