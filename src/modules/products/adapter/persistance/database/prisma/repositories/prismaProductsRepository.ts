import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { Product } from '@modules/products/domain/product';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/adapter/database/prisma/prisma.service';
import { PrismaProductMapper } from '../mappers/prismaProductMapper';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.create({ data: raw });
  }
}
