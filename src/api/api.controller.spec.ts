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
    it('should return valid data for each endpoint', () => {
      const controllerMethods = [
        'getAllFilms',
        'getAllPlanets',
        'getAllSpecies',
        'getAllStarships',
        'getAllVehicles',
      ];
      const promises = controllerMethods.map((methodName) =>
        apiController[methodName](),
      );
      Promise.allSettled(promises).then((results) => {
        results.forEach((result) => expect(result).toBe('fulfilled'));
      });
    });
  });

  describe('getOne', () => {
    it('should return valid data for each endpoint', () => {
      const controllerMethods = [
        'getFilm',
        'getPlanet',
        'getSpecies',
        'getStarship',
        'getVehicle',
      ];
      const promises = controllerMethods.map((methodName) =>
        apiController[methodName]('1'),
      );
      Promise.allSettled(promises).then((results) => {
        results.forEach((result) => expect(result).toBe('fulfilled'));
      });
    });
  });
});
