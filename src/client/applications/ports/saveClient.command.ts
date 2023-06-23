export class SaveClientCommand {
  constructor(
    readonly name: string,
    readonly cpf: string,
    readonly email: string,
  ) {}
}
