import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Order } from '@modules/orders/domain/order';
import { ProductsRepository } from '@modules/products/application/ports/productsRepository';
import { OrderProduct } from '@modules/orders/domain/orderProduct';
import { OrdersRepository } from '../ports/ordersRepository';
import { ClientRepository } from '@modules/client/applications/ports/clientRepository';

interface IRequest {
  clientId: string;
  products: {
    id: string;
    amount: number;
  }[];
}

interface IResponse {
  order: Order;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private clientsRepository: ClientRepository,
    private productsRepository: ProductsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { clientId, products } = request;

    let client;

    if (clientId) {
      client = await this.clientsRepository.findById(clientId);

      if (!client) {
        throw new HttpException('Client not found.', HttpStatus.BAD_REQUEST);
      }
    }

    let fullPrice = 0;

    const orderProductsPromises = products.map(async (prod) => {
      const product = await this.productsRepository.findById(prod.id);

      if (!product) {
        throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
      }

      fullPrice += product.price * prod.amount;

      return new OrderProduct({
        product,
        productAmt: prod.amount,
      });
    });

    const orderProducts = await Promise.all(orderProductsPromises);

    const allStatus = await this.ordersRepository.listAllStatus();

    const status = allStatus.find((st) => st.description === 'Recebido');

    const order = new Order({
      client,
      products: orderProducts,
      fullPrice,
      status,
    });

    await this.ordersRepository.create(order);

    return { order };
  }
}
