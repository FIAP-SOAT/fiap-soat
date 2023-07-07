import { ClientModule } from '@modules/client/client.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { ProductsModule } from '@modules/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ClientModule, ProductsModule, OrdersModule],
})
export class HttpModule {}
