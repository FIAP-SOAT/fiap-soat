import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { CreateProductController } from './adapter/http/controllers/createProduct.controller';
import { RemoveProductController } from './adapter/http/controllers/removeProduct.controller';
import { UpdateProductController } from './adapter/http/controllers/updateProduct.controller';
import { CreateProductUseCase } from './application/services/createProductUseCase';
import { RemoveProductUseCase } from './application/services/removeProductUseCase';
import { UpdateProductUseCase } from './application/services/updateProductUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    UpdateProductController,
    RemoveProductController,
  ],
  providers: [CreateProductUseCase, UpdateProductUseCase, RemoveProductUseCase],
})
export class ProductsModule {}
