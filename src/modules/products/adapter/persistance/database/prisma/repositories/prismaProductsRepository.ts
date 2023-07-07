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

  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async save(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async listByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        category_id: categoryId,
        is_active: true,
      },
      include: { category: true },
    });

    return products.map(PrismaProductMapper.toDomain);
  }
}
