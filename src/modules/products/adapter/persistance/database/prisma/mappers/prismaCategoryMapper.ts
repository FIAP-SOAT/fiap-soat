import { Category } from '@modules/products/domain/category';
import { Category as PrismaCategory } from '@prisma/client';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): PrismaCategory {
    return {
      id: category.id,
      name: category.name,
      created_at: category.createdAt,
    };
  }

  static toDomain(raw: PrismaCategory): Category {
    return new Category(
      {
        name: raw.name,
        createdAt: raw.created_at,
      },
      raw.id,
    );
  }
}
