import { CreateOrderUseCase } from '@modules/orders/application/services/createOrderUseCase';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateOrderBody } from '../requests/createOrderBody';
import { OrderViewModel } from '../viewModels/orderViewModel';

@Controller('orders')
@ApiTags('orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Client or product not found.' })
  async create(@Body() body: CreateOrderBody) {
    const { clientId, products } = body;

    const { order } = await this.createOrderUseCase.execute({
      clientId,
      products,
    });

    return { order: OrderViewModel.toHTTP(order) };
  }
}
