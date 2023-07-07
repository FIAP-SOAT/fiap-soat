import { Status } from '@modules/orders/domain/status';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../ports/ordersRepository';

interface IResponse {
  status: Status[];
}

@Injectable()
export class ListStatusUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<IResponse> {
    const status = await this.ordersRepository.listAllStatus();

    return { status };
  }
}
