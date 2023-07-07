import { IsNotEmpty } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class GetClientParams {
  @IsNotEmpty()
  @IsCPF({ message: 'CPF inválido' })
  readonly cpf: string;
}
