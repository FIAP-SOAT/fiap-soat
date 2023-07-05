import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../ports/ordersRepository';
import { Order } from '@modules/orders/domain/order';

interface IOrders {
  orders: Order[];
}

@Injectable()
export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<IOrders> {
    const orders = await this.ordersRepository.listAllOrders();

    return { orders };
  }
}
