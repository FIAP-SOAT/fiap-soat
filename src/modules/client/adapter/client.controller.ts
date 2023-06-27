import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientRequest } from './client.request';
import { SaveClientUseCase } from '../applications/ports/saveClient.use-case';

@Controller('client')
export class ClientController {
  constructor(private readonly saveClientUseCase: SaveClientUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe())
  save(@Body() request: ClientRequest) {
    this.saveClientUseCase.saveClient(request);
  }
}
