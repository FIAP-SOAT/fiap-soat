import { ClientModule } from '@modules/client/client.module';
import { ProductsModule } from '@modules/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ClientModule, ProductsModule],
})
export class HttpModule {}
