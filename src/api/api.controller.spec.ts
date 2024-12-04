import { ApiService } from './api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';

describe('AppController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.healthCheck()).toBe('Hello World!');
    });
  });
});
