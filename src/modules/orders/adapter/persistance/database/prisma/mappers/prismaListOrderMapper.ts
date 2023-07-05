import { Order } from '@modules/orders/domain/order';
import {
  Client,
  OrderProduct,
  Status,
  Order as PrismaOrder,
} from '@prisma/client';
import { PrismaStatusMapper } from './prismaStatusMapper';
import { PrismaOrderProductMapper } from './prismaOrderProductMapper';

interface DomainListPrismaOrder extends PrismaOrder {
  status: Status;
  client: Client;
  OrderProduct: OrderProduct[];
}

export class PrismaListOrderMapper {
  static toDomain(raw: DomainListPrismaOrder): Order {
    return new Order(
      {
        status: PrismaStatusMapper.toDomain(raw.status),
        updatedAt: raw.updated_at,
        createdAt: raw.created_at,
        products: raw.OrderProduct.map(PrismaOrderProductMapper.toDomain),
        client: raw.client,
        fullPrice: raw.full_price,
      },
      raw.id,
    );
  }
}
