import { Controller, Get, Param } from '@nestjs/common';
import { Film, Planet, Species, Starship, Vehicle } from 'src/types/types';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  healthCheck(): string {
    return 'Hello world';
  }

  @Get('/films')
  getAllFilms(): Promise<Array<Film>> {
    return this.apiService.findAllFilms();
  }

  @Get('/films/:id')
  getFilm(@Param('id') id: string): Promise<Film> {
    return this.apiService.findFilm(id);
  }

  @Get('/species')
  getAllSpecies(): Promise<Array<Species>> {
    return this.apiService.findAllSpecies();
  }

  @Get('/species/:id')
  getSpecies(@Param('id') id: string): Promise<Species> {
    return this.apiService.findSpecies(id);
  }

  @Get('/vehicles')
  getAllVehicles(): Promise<Array<Vehicle>> {
    return this.apiService.findAllVehicles();
  }

  @Get('/vehicles/:id')
  getVehicle(@Param('id') id: string): Promise<Vehicle> {
    return this.apiService.findVehicle(id);
  }

  @Get('/starships')
  getAllStarships(): Promise<Array<Starship>> {
    return this.apiService.findAllStarships();
  }

  @Get('/starships/:id')
  getStarship(@Param('id') id: string): Promise<Starship> {
    return this.apiService.findStarship(id);
  }

  @Get('/planets')
  getAllPlanets(): Promise<Array<Planet>> {
    return this.apiService.findAllPlanets();
  }

  @Get('/planets/:id')
  getPlanet(@Param('id') id: string): Promise<Planet> {
    return this.apiService.findPlanet(id);
  }
}
