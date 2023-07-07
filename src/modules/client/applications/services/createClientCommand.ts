export class CreateClientCommand {
  constructor(
    readonly name: string,
    readonly cpf: string,
    readonly email: string,
  ) {}
}
