import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Product } from '../../domain/product';
import { CategoriesRepository } from '../ports/categoriesRepository';
import { ProductsRepository } from '../ports/productsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imagesUrl: string;
}

interface IResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(
    private categoryRepository: CategoriesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { name, description, price, categoryId, imagesUrl } = request;

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new HttpException(
        'Product Category does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      imagesUrl,
    });

    await this.productsRepository.create(product);

    return { product };
  }
}
