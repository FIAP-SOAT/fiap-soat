import { ListOrdersUseCase } from '@modules/orders/application/services/listOrdersUseCase';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderViewModel } from '../viewModels/orderViewModel';

@Controller('orders')
@ApiTags('orders')
export class ListOrdersController {
  constructor(private listOrdersUseCase: ListOrdersUseCase) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success listing orders' })
  @ApiQuery({
    name: 'status',
    example:
      '95a7681e-8640-4467-bfa5-c09861228d7e,a7c05e4c-7c71-4238-93fc-238e169356dd',
    description: 'List with status ids to be filtered',
    required: false,
  })
  async list(
    @Query('status')
    reqStatus?: string,
  ) {
    let status;

    if (reqStatus) {
      status = reqStatus.split(',');
    }

    const { orders } = await this.listOrdersUseCase.execute({ status });

    return { orders: orders.map(OrderViewModel.toHTTP) };
  }
}
