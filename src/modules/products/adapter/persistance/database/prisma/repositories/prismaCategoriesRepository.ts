import { CategoriesRepository } from '@modules/products/application/ports/categoriesRepository';
import { Category } from '@modules/products/domain/category';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/adapter/database/prisma/prisma.service';
import { PrismaCategoryMapper } from '../mappers/prismaCategoryMapper';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return null;
    }

    return PrismaCategoryMapper.toDomain(category);
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    return categories.map(PrismaCategoryMapper.toDomain);
  }

  async create(category: Category): Promise<void> {
    const raw = PrismaCategoryMapper.toPrisma(category);

    await this.prisma.category.create({ data: raw });
  }
}
