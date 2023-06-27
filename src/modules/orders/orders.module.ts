import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateOrderController } from './adapter/http/controllers/createOrder.controller';
import { CreateOrderUseCase } from './application/services/createOrderUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrderController],
  providers: [CreateOrderUseCase],
})
export class OrdersModule {}
