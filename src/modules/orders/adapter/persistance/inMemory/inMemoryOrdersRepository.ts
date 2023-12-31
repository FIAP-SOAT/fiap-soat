import { OrdersRepository } from '@modules/orders/application/ports/ordersRepository';
import { Order } from '@modules/orders/domain/order';
import { Status } from '@modules/orders/domain/status';

export class InMemoryOrdersRepository implements OrdersRepository {
  status: Status[] = [];
  orders: Order[] = [];

  async createStatus(status: Status): Promise<void> {
    this.status.push(status);
  }

  async listAllStatus(): Promise<Status[]> {
    return this.status;
  }

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async listAllOrders(): Promise<Order[]> {
    return this.orders;
  }

  async listOrders(status: string[]): Promise<Order[]> {
    const orders = this.orders.filter((order) =>
      status.includes(order.status.id),
    );

    return orders;
  }
}
