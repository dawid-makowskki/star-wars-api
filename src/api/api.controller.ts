import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  Film,
  PaginatedResource,
  Planet,
  Species,
  Starship,
  Vehicle,
} from 'src/types/types';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  healthCheck(): string {
    return 'Hello world';
  }

  @Get('/films')
  getAllFilms(
    @Query() query: Record<string, string>,
    @Query('page') page = 0,
  ): Promise<PaginatedResource<Film>> {
    return this.apiService.findAll('films', query, page);
  }

  @Get('/vehicles')
  getAllVehicles(
    @Query() query: Record<string, string>,
    @Query('page') page = 0,
  ): Promise<PaginatedResource<Vehicle>> {
    return this.apiService.findAll('vehicles', query, page);
  }

  @Get('/starships')
  getAllStarships(
    @Query() query: Record<string, string>,
    @Query('page') page = 0,
  ): Promise<PaginatedResource<Starship>> {
    return this.apiService.findAll('starships', query, page);
  }

  @Get('/planets')
  getAllPlanets(
    @Query() query: Record<string, string>,
    @Query('page') page = 0,
  ): Promise<PaginatedResource<Planet>> {
    return this.apiService.findAll('planets', query, page);
  }

  @Get('/species')
  getAllSpecies(
    @Query() query: Record<string, string>,
    @Query('page') page = 0,
  ): Promise<PaginatedResource<Species>> {
    return this.apiService.findAll('species', query, page);
  }

  @Get('/films/:id')
  getFilm(@Param('id') id: string): Promise<Film> {
    return this.apiService.findOne('films', id);
  }

  @Get('/vehicles/:id')
  getVehicle(@Param('id') id: string): Promise<Vehicle> {
    return this.apiService.findOne('vehicles', id);
  }

  @Get('/planets/:id')
  getPlanet(@Param('id') id: string): Promise<Planet> {
    return this.apiService.findOne('planets', id);
  }

  @Get('/starships/:id')
  getStarship(@Param('id') id: string): Promise<Starship> {
    return this.apiService.findOne('starships', id);
  }

  @Get('/species/:id')
  getSpecies(@Param('id') id: string): Promise<Species> {
    return this.apiService.findOne('species', id);
  }

  @Get('/unique-words-count')
  async getUniqueWordsCount(): Promise<Array<[string, number]>> {
    return this.apiService.findUniqueWordsCount();
  }

  @Get('/most-frequent-character-name')
  async getMostFrequentCharacterName(): Promise<string | Array<string>> {
    return this.apiService.findMostFrequentCharacterName();
  }
}
