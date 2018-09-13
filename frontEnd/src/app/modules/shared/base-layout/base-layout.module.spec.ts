import { BaseLayoutModule } from './base-layout.module';

describe('BaseLayoutModule', () => {
  let baseLayoutModule: BaseLayoutModule;

  beforeEach(() => {
    baseLayoutModule = new BaseLayoutModule();
  });

  it('should create an instance', () => {
    expect(baseLayoutModule).toBeTruthy();
  });
});
