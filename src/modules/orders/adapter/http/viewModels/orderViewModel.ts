import { Order } from '@modules/orders/domain/order';
import { OrderProductViewModel } from './orderProductViewModel';
import { StatusViewModel } from './statusViewModel';
import { ClientViewModel } from '@modules/client/adapter/http/viewModels/clientViewModel';

export class OrderViewModel {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      fullPrice: order.fullPrice,
      client: order.client ? ClientViewModel.toHTTP(order.client) : undefined,
      status: StatusViewModel.toHTTP(order.status),
      products: order.products?.map(OrderProductViewModel.toHTTP),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
