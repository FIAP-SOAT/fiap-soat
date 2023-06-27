import { Order } from '@modules/orders/domain/order';
import {
  Client,
  OrderProduct,
  Order as PrismaOrder,
  Status,
} from '@prisma/client';
import { PrismaStatusMapper } from './prismaStatusMapper';
import { PrismaOrderProductMapper } from './prismaOrderProductMapper';

interface DomainPrismaOrder extends PrismaOrder {
  status: Status;
  client?: Client;
  orderProducts: OrderProduct[];
}

export class PrismaOrderMapper {
  static toPrisma(order: Order): PrismaOrder {
    return {
      id: order.id,
      full_price: order.fullPrice,
      status_id: order.status.id,
      client_id: order.client?.id,
      created_at: order.createdAt,
      updated_at: order.updatedAt,
    };
  }

  static toDomain(raw: DomainPrismaOrder): Order {
    return new Order(
      {
        fullPrice: raw.full_price,
        status: PrismaStatusMapper.toDomain(raw.status),
        products: raw.orderProducts.map(PrismaOrderProductMapper.toDomain),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );
  }
}
