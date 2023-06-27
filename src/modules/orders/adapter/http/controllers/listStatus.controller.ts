import { ListStatusUseCase } from '@modules/orders/application/services/listStatusUseCase';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { StatusViewModel } from '../viewModels/statusViewModel';

@Controller('orders')
@ApiTags('orders')
export class ListStatusController {
  constructor(private listStatusUseCase: ListStatusUseCase) {}

  @Get('status')
  @ApiResponse({ status: 200, description: 'Success listing status' })
  async list() {
    const { status } = await this.listStatusUseCase.execute();

    return { status: status.map(StatusViewModel.toHTTP) };
  }
}
