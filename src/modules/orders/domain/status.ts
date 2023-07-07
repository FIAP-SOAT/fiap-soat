import { Replace } from '@shared/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface StatusProps {
  description: string;
  createdAt: Date;
}

export class Status {
  private _id: string;
  private props: StatusProps;

  constructor(props: Replace<StatusProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get description(): string {
    return this.props.description;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
