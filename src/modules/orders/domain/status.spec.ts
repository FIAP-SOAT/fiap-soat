import { Status } from './status';

describe('Status', () => {
  it('should be able to create a new status', () => {
    const status = new Status({
      description: 'status',
    });

    expect(status).toBeTruthy();
  });
});
