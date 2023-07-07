import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../ports/ordersRepository';
import { Order } from '@modules/orders/domain/order';

interface IRequest {
  status?: string[];
}

interface IResponse {
  orders: Order[];
}

@Injectable()
export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { status } = request;

    const orders = status
      ? await this.ordersRepository.listOrders(status)
      : await this.ordersRepository.listAllOrders();

    return { orders };
  }
}
