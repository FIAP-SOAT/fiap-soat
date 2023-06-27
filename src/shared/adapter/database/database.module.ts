import { PrismaCategoriesRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaCategoriesRepository';
import { PrismaProductsRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaProductsRepository';
import { CategoriesRepository } from '@modules/products/application/ports/categoriesRepository';
import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientPersistenceAdapter } from '@modules/client/adapter/client-persistence.adapter';
import { ClientPersistencePort } from '@modules/client/applications/ports/client-persistence.port';
import { OrdersRepository } from '@modules/orders/application/ports/ordersRepository';
import { PrismaOrdersRepository } from '@modules/orders/adapter/persistance/database/prisma/repositories/prismaOrdersRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: ClientPersistencePort,
      useClass: ClientPersistenceAdapter,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
  ],
  exports: [
    PrismaService,
    CategoriesRepository,
    ProductsRepository,
    ClientPersistencePort,
    OrdersRepository,
  ],
})
export class DatabaseModule {}
