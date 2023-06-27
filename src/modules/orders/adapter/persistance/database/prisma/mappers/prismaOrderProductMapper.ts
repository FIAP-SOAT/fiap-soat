import { OrderProduct } from '@modules/orders/domain/orderProduct';
import {
  DomainPrismaProduct,
  PrismaProductMapper,
} from '@modules/products/adapter/persistance/database/prisma/mappers/prismaProductMapper';
import { OrderProduct as PrismaOrderProduct } from '@prisma/client';

interface DomainPrismaOrderProduct extends PrismaOrderProduct {
  product: DomainPrismaProduct;
}

export class PrismaOrderProductMapper {
  static toPrisma(orderProduct: OrderProduct) {
    return {
      id: orderProduct.id,
      product_id: orderProduct.product.id,
      product_amt: orderProduct.productAmt,
      created_at: orderProduct.createdAt,
    };
  }

  static toDomain(raw: DomainPrismaOrderProduct): OrderProduct {
    return new OrderProduct(
      {
        product: PrismaProductMapper.toDomain(raw.product),
        productAmt: raw.product_amt,
        createdAt: raw.created_at,
      },
      raw.id,
    );
  }
}
