import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '@modules/orders/application/ports/ordersRepository';
import { Order } from '@modules/orders/domain/order';
import { Status } from '@modules/orders/domain/status';
import { PrismaService } from '@shared/adapter/database/prisma/prisma.service';
import { PrismaStatusMapper } from '../mappers/prismaStatusMapper';
import { PrismaOrderMapper } from '../mappers/prismaOrderMapper';
import { PrismaOrderProductMapper } from '../mappers/prismaOrderProductMapper';
import { PrismaListOrderMapper } from '../mappers/prismaListOrderMapper';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async createStatus(status: Status): Promise<void> {
    const raw = PrismaStatusMapper.toPrisma(status);

    await this.prisma.status.create({ data: raw });
  }

  async listAllStatus(): Promise<Status[]> {
    const status = await this.prisma.status.findMany();

    return status.map(PrismaStatusMapper.toDomain);
  }

  async create(order: Order): Promise<void> {
    const rawOrder = PrismaOrderMapper.toPrisma(order);
    const rawOrderProducts = order.products.map(
      PrismaOrderProductMapper.toPrisma,
    );

    await this.prisma.order.create({
      data: {
        ...rawOrder,
        OrderProduct: {
          create: rawOrderProducts,
        },
      },
    });
  }

  async listAllOrders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        OrderProduct: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
        client: true,
        status: true,
      },
    });

    return orders.map(PrismaListOrderMapper.toDomain);
  }

  async listOrders(status: string[]): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        status_id: {
          in: status,
        },
      },
      include: {
        OrderProduct: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
        client: true,
        status: true,
      },
    });

    return orders.map(PrismaListOrderMapper.toDomain);
  }
}
