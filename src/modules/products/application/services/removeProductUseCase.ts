import { Product } from '@modules/products/domain/product';
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ProductsRepository } from '../ports/productsRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  product: Product;
}

@Injectable()
export class RemoveProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { id } = request;

    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
    }

    product.isActive = false;

    await this.productsRepository.save(product);

    return { product };
  }
}
