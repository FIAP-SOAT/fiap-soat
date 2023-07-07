import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Product } from '@modules/products/domain/product';
import { CategoriesRepository } from '../ports/categoriesRepository';
import { ProductsRepository } from '../ports/productsRepository';

interface IRequest {
  categoryId: string;
}

interface IResponse {
  products: Product[];
}

@Injectable()
export class ListProductsByCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { categoryId } = request;

    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new HttpException(
        'Product Category does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const products = await this.productsRepository.listByCategory(categoryId);

    return { products };
  }
}
