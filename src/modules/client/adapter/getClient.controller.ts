import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { GetClientUseCase } from '../applications/ports/getClient.useCase';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('client')
export class GetClientController {
  constructor(private readonly getClientUseCase: GetClientUseCase) {}

  @Get('/:cpf')
  @ApiResponse({ status: 200, description: 'Retrieved' })
  @ApiResponse({ status: 400, description: 'Client not found.' })
  findClient(@Param('cpf') cpf: string) {
    this.getClientUseCase.findByCpf(cpf);
  }
}
