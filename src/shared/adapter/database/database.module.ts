import { PrismaCategoriesRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaCategoriesRepository';
import { PrismaProductsRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaProductsRepository';
import { CategoriesRepository } from '@modules/products/application/ports/categoriesRepository';
import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrdersRepository } from '@modules/orders/application/ports/ordersRepository';
import { PrismaOrdersRepository } from '@modules/orders/adapter/persistance/database/prisma/repositories/prismaOrdersRepository';
import { ClientRepository } from '@modules/client/applications/ports/clientRepository';
import { ClientPersistenceAdapter } from '@modules/client/adapter/persistance/database/prisma/repositories/primaClientRepository';

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
      provide: ClientRepository,
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
    ClientRepository,
    OrdersRepository,
  ],
})
export class DatabaseModule {}
