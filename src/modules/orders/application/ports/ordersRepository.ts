import { Order } from '@modules/orders/domain/order';
import { Status } from '@modules/orders/domain/status';

export abstract class OrdersRepository {
  abstract createStatus(status: Status): Promise<void>;
  abstract listAllStatus(): Promise<Status[]>;
  abstract listAllOrders(): Promise<Order[]>;
  abstract listOrders(status: string[]): Promise<Order[]>;
  abstract create(order: Order): Promise<void>;
}
