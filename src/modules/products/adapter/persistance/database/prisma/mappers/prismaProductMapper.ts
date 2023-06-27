import { Product } from '@modules/products/domain/product';
import {
  Category as PrismaCategory,
  Product as PrismaProduct,
} from '@prisma/client';
import { PrismaCategoryMapper } from './prismaCategoryMapper';

export interface DomainPrismaProduct extends PrismaProduct {
  category: PrismaCategory;
}

export class PrismaProductMapper {
  static toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      is_active: product.isActive,
      category_id: product.category.id,
      images_url: product.imagesUrl,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }

  static toDomain(raw: DomainPrismaProduct): Product {
    return new Product(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
        isActive: raw.is_active,
        category: PrismaCategoryMapper.toDomain(raw.category),
        imagesUrl: raw.images_url,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );
  }
}
