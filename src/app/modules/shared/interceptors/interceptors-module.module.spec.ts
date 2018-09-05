import { InterceptorsModule } from './interceptors-module.module';

describe('InterceptorsModuleModule', () => {
  let interceptorsModuleModule: InterceptorsModule;

  beforeEach(() => {
    interceptorsModuleModule = new InterceptorsModule();
  });

  it('should create an instance', () => {
    expect(interceptorsModuleModule).toBeTruthy();
  });
});
