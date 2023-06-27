import { makeProduct } from '@modules/products/domain/factories/ProductFactory';
import { OrderProduct } from './orderProduct';

describe('Order Products', () => {
  it('should be able to create an order product', () => {
    const orderProduct = new OrderProduct({
      productAmt: 9,
      product: makeProduct(),
    });

    expect(orderProduct).toBeTruthy();
  });
});
