import { makeProduct } from '@modules/products/domain/factories/ProductFactory';
import { Order } from './order';
import { OrderProduct } from './orderProduct';
import { Status } from './status';

describe('Orders', () => {
  it('should be able to create a new order', () => {
    const sale = new Order({
      status: new Status({
        description: 'Received',
      }),
      fullPrice: 50,
      products: [
        new OrderProduct({
          productAmt: 10,
          product: makeProduct(),
        }),
      ],
    });

    expect(sale).toBeTruthy();
    expect(sale).toHaveProperty('id');
  });
});
