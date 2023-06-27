import { randomUUID } from 'node:crypto';
import { Client } from '@modules/client/domain/client';
import { Replace } from '@shared/helpers/Replace';
import { Status } from './status';
import { OrderProduct } from './orderProduct';

export interface OrderProps {
  client?: Client;
  fullPrice: number;
  status: Status;
  products: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(
    props: Replace<OrderProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set client(value: Client) {
    this.props.client = value;
    this.update();
  }

  public get client(): Client {
    return this.props.client;
  }

  public set fullPrice(value: number) {
    this.props.fullPrice = value;
    this.update();
  }

  public get fullPrice(): number {
    return this.props.fullPrice;
  }

  public set status(value: Status) {
    this.props.status = value;
    this.update();
  }

  public get status(): Status {
    return this.props.status;
  }

  public set products(value: OrderProduct[]) {
    this.props.products = value;
    this.update();
  }

  public get products(): OrderProduct[] {
    return this.props.products;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private update() {
    this.props.updatedAt = new Date();
  }
}
