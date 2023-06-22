import { Replace } from '@shared/helpers/Replace';
import { randomUUID } from 'node:crypto';
import { Category } from './category';

export interface ProductProps {
  name: string;
  description: string;
  price: number;
  category: Category;
  imagesUrl: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(
    props: Replace<ProductProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      isActive: true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(value: string) {
    this.props.name = value;
    this.update();
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(value: string) {
    this.props.description = value;
    this.update();
  }

  public get description(): string {
    return this.props.description;
  }

  public set price(value: number) {
    this.props.price = value;
    this.update();
  }

  public get price(): number {
    return this.props.price;
  }

  public set category(value: Category) {
    this.props.category = value;
    this.update();
  }

  public get category(): Category {
    return this.props.category;
  }

  public set imagesUrl(value: string) {
    this.props.imagesUrl = value;
    this.update();
  }

  public get imagesUrl(): string {
    return this.props.imagesUrl;
  }

  public set isActive(value: boolean) {
    this.props.isActive = value;
    this.update();
  }

  public get isActive(): boolean {
    return this.props.isActive;
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
