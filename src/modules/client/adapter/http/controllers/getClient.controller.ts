import { GetClientUseCase } from '@modules/client/applications/services/getClientUseCase';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { GetClientCommand } from '@modules/client/applications/services/getClientCommand';

@Controller('client')
@ApiTags('client')
export class GetClientController {
  constructor(private readonly getClientUseCase: GetClientUseCase) {}

  @Get('/:cpf')
  @ApiResponse({ status: 200, description: 'Retrieved' })
  @ApiResponse({ status: 400, description: 'Client not found.' })
  async findClient(@Param('cpf') cpf: string) {
    const request = new GetClientCommand(cpf);

    return this.getClientUseCase.getClient(request);
  }
}
