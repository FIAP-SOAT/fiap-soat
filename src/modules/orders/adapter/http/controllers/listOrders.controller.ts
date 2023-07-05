import { ListOrdersUseCase } from '@modules/orders/application/services/listOrdersUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderViewModel } from '../viewModels/orderViewModel';

@Controller('orders')
@ApiTags('orders')
export class ListOrdersController {
  constructor(private listOrdersUseCase: ListOrdersUseCase) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success listing orders' })
  async list() {
    const { orders } = await this.listOrdersUseCase.execute();

    return { orders: orders.map(OrderViewModel.toHTTP) };
  }
}
