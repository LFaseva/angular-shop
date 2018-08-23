import { ProductsModule } from '@client/products/products.module';

describe('ItemModule', () => {
  let productsModule: ProductsModule;

  beforeEach(() => {
    productsModule = new ProductsModule();
  });

  it('should create an instance', () => {
    expect(productsModule).toBeTruthy();
  });
});
