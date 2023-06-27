import { Status } from '@modules/orders/domain/status';

export class StatusViewModel {
  static toHTTP(status: Status) {
    return {
      id: status.id,
      description: status.description,
      createdAt: status.createdAt,
    };
  }
}
