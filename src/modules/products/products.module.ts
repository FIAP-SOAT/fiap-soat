import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateProductController } from './adapter/http/controllers/createProduct.controller';
import { CreateProductUseCase } from './application/services/createProductUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController],
  providers: [CreateProductUseCase],
})
export class ProductsModule {}
