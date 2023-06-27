import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateOrderController } from './adapter/http/controllers/createOrder.controller';
import { CreateOrderUseCase } from './application/services/createOrderUseCase';
import { ListStatusController } from './adapter/http/controllers/listStatus.controller';
import { ListStatusUseCase } from './application/services/listStatusUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrderController, ListStatusController],
  providers: [CreateOrderUseCase, ListStatusUseCase],
})
export class OrdersModule {}
