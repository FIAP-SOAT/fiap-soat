import { PrismaCategoriesRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaCategoriesRepository';
import { PrismaProductsRepository } from '@modules/products/adapter/persistance/database/prisma/repositories/prismaProductsRepository';
import { CategoriesRepository } from '@modules/products/application/ports/categoriesRepository';
import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

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
  ],
  exports: [PrismaService, CategoriesRepository, ProductsRepository],
})
export class DatabaseModule {}
