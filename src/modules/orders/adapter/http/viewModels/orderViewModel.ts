import { Order } from '@modules/orders/domain/order';
import { OrderProductViewModel } from './orderProductViewModel';

export class OrderViewModel {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      fullPrice: order.fullPrice,
      client: order.client,
      status: order.status,
      products: order.products?.map(OrderProductViewModel.toHTTP),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
