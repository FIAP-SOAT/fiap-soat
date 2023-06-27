import { Product } from '@modules/products/domain/product';
import { Replace } from '@shared/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface OrderProductProps {
  product: Product;
  productAmt: number;
  createdAt: Date;
}

export class OrderProduct {
  private _id: string;
  private props: OrderProductProps;

  constructor(
    props: Replace<OrderProductProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set product(value: Product) {
    this.props.product = value;
  }

  public get product(): Product {
    return this.props.product;
  }

  public set productAmt(value: number) {
    this.props.productAmt = value;
  }

  public get productAmt(): number {
    return this.props.productAmt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
