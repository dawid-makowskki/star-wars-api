import { ApiService } from './api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { SwapiService } from '../swapi/swapi.service';
import { getFilmResponse, getFilmsResponse } from '../mocks';
import { WordFinderService } from '../word-finder/word-finder.service';

describe('AppController', () => {
  let apiController: ApiController;
  let swapiServiceMock: Partial<SwapiService>;

  beforeEach(async () => {
    swapiServiceMock = {
      fetchMany: jest.fn().mockResolvedValue(getFilmsResponse),
      fetchOne: jest.fn().mockResolvedValue(getFilmResponse)
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 1000 * 5,
          max: 100,
        }),
      ],
      controllers: [ApiController],
      providers: [ApiService, {provide: SwapiService, useValue: swapiServiceMock}, WordFinderService],
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
    }, 20000);
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
    }, 20000);
  });

  describe('pagination and filter', () => {
    it('should return correct paginated response with two items', async () => {
      const response = await apiController.getAllFilms({}, 2);
      expect(response.pages).toBe(3);
      expect(response.page).toBe(2);
      expect(response.data.length).toBe(2);
    });

    it('should return films produced by Gary', async () => {
      const response = await apiController.getAllFilms(
        { producer: 'Gary' },
        0,
      );

      expect(
        response.data.every((film) => film.producer.includes('Gary')),
      ).toBeTruthy();
    });

    it('should return no data for incorrect query', async () => {
      const response = await apiController.getAllFilms(
        { name: 'randomstringnowaythereisaplanetwiththatname' },
        0,
      );
      expect(response.data.length).toBe(0);
    });
  });
});
