import { Product } from '@modules/products/domain/product';
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../ports/categoriesRepository';
import { ProductsRepository } from '../ports/productsRepository';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  imagesUrl?: string;
}

interface IResponse {
  product: Product;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(request: IRequest): Promise<IResponse> {
    const { id, name, description, price, categoryId, imagesUrl } = request;

    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
    }

    if (categoryId && categoryId !== product.category.id) {
      const category = await this.categoriesRepository.findById(categoryId);

      if (!category) {
        throw new HttpException(
          'Product Category does not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }

      product.category = category;
    }

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (imagesUrl) {
      product.imagesUrl = imagesUrl;
    }

    await this.productsRepository.save(product);

    return { product };
  }
}
