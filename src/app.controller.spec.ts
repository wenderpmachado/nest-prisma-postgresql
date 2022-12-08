import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "API Version: VERSION"', () => {
      const apiVersionText = 'API Version';

      const result = appController.getHello();

      expect(result.startsWith(apiVersionText)).toBeTruthy();
    });
  });
});
