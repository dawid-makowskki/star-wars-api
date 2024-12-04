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
      expect(apiController.healthCheck()).toBe('Hello world');
    });
  });

  describe('getAll', () => {
    it('should return valid data for each endpoint', async () => {
      const controllerMethods = [
        'getAllFilms',
        'getAllPlanets',
        'getAllSpecies',
        'getAllStarships',
        'getAllVehicles',
      ];
      const promises = controllerMethods.map((methodName) =>
        apiController[methodName]({}, 0),
      );
      const results = await Promise.allSettled(promises);

      results.forEach((result) => expect(result.status).toBe('fulfilled'));
    });
  });

  describe('getOne', () => {
    it('should return valid data for each endpoint', async () => {
      const controllerMethods = [
        ['getFilm', '1'],
        ['getPlanet', '1'],
        ['getSpecies', '1'],
        ['getStarship', '9'],
        ['getVehicle', '4'],
      ];
      const promises = controllerMethods.map((method) =>
        apiController[method[0]](method[1]),
      );

      const results = await Promise.allSettled(promises);

      results.forEach((result) => expect(result.status).toBe('fulfilled'));
    });
  });

  describe('pagination', () => {
    it('should return correct paginated response with two items', async () => {
      const response = await apiController.getAllFilms({}, 2);
      expect(response.pages).toBe(3);
      expect(response.page).toBe(2);
      expect(response.data.length).toBe(2);
    });
  });
});
