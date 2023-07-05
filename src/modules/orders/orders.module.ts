import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateOrderController } from './adapter/http/controllers/createOrder.controller';
import { CreateOrderUseCase } from './application/services/createOrderUseCase';
import { ListStatusController } from './adapter/http/controllers/listStatus.controller';
import { ListStatusUseCase } from './application/services/listStatusUseCase';
import { ListOrdersController } from './adapter/http/controllers/listOrders.controller';
import { ListOrdersUseCase } from './application/services/listOrdersUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    ListStatusController,
    ListOrdersController,
  ],
  providers: [CreateOrderUseCase, ListStatusUseCase, ListOrdersUseCase],
})
export class OrdersModule {}
