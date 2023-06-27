import { IsEmail, IsNotEmpty } from 'class-validator';

export class ClientRequest {
  @IsNotEmpty()
  readonly cpf: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
