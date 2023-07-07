import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateClientRequest } from '../requests/createClientBody';
import { CreateClientUseCase } from '@modules/client/applications/services/createClientUseCase';

@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({
    status: 400,
    description: 'Invalid client data or client already exists',
  })
  @UsePipes(new ValidationPipe())
  async createClient(@Body() request: CreateClientRequest) {
    const client = await this.createClientUseCase.saveClient(request);

    return { client };
  }
}
