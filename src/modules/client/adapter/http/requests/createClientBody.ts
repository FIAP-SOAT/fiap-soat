import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateClientRequest {
  @IsNotEmpty()
  @IsCPF({ message: 'CPF inválido' })
  @ApiProperty({ example: '12312312312', description: 'CPF do Cliente' })
  readonly cpf: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'Nome do Cliente' })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'E-mail do Cliente',
  })
  readonly email: string;
}
