import { OrderProduct } from '@modules/orders/domain/orderProduct';
import { ProductViewModel } from '@modules/products/adapter/http/viewModels/productViewModel';

export class OrderProductViewModel {
  static toHTTP(saleProduct: OrderProduct) {
    return {
      id: saleProduct.id,
      product: ProductViewModel.toHTTP(saleProduct.product),
      productAmt: saleProduct.productAmt,
      createdAt: saleProduct.createdAt,
    };
  }
}
