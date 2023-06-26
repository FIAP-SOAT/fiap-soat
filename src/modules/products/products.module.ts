import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateProductController } from './adapter/http/controllers/createProduct.controller';
import { UpdateProductController } from './adapter/http/controllers/updateProduct.controller';
import { CreateProductUseCase } from './application/services/createProductUseCase';
import { UpdateProductUseCase } from './application/services/updateProductUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProductController, UpdateProductController],
  providers: [CreateProductUseCase, UpdateProductUseCase],
})
export class ProductsModule {}
