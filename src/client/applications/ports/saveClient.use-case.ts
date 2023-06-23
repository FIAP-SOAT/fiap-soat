import { SaveClientCommand } from './saveClient.command';

export abstract class SaveClientUseCase {
  abstract saveClient(command: SaveClientCommand): Promise<void>;
}
