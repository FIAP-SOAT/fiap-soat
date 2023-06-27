import { Status } from '@modules/orders/domain/status';
import { Status as PrismaStatus } from '@prisma/client';

export class PrismaStatusMapper {
  static toPrisma(status: Status): PrismaStatus {
    return {
      id: status.id,
      description: status.description,
      created_at: status.createdAt,
    };
  }

  static toDomain(raw: PrismaStatus): Status {
    return new Status(
      {
        description: raw.description,
        createdAt: raw.created_at,
      },
      raw.id,
    );
  }
}
