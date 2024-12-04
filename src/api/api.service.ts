import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { $Fetch, ofetch } from 'ofetch';
import { Film, Planet, Species, Starship, Vehicle } from 'src/types/types';

@Injectable()
export class ApiService {
  private readonly swapi: $Fetch;

  constructor() {
    this.swapi = ofetch.create({ baseURL: 'https://swapi.dev/api' });
  }

  async findAllFilms(): Promise<Array<Film>> {
    try {
      return (await this.swapi('/films')) as Array<Film>;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findFilm(id: string): Promise<Film> {
    try {
      return (await this.swapi(`/films/${id}`)) as Film;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllSpecies(): Promise<Array<Species>> {
    try {
      return (await this.swapi(`/species`)) as Array<Species>;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findSpecies(id: string): Promise<Species> {
    try {
      return (await this.swapi(`/species/${id}`)) as Species;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllVehicles(): Promise<Array<Vehicle>> {
    try {
      return (await this.swapi(`/vehicles`)) as Array<Vehicle>;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findVehicle(id: string): Promise<Vehicle> {
    try {
      return (await this.swapi(`/vehicles/${id}`)) as Vehicle;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllStarships(): Promise<Array<Starship>> {
    try {
      return (await this.swapi(`/starships`)) as Array<Starship>;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findStarship(id: string): Promise<Starship> {
    try {
      return (await this.swapi(`/starships/${id}`)) as Starship;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllPlanets(): Promise<Array<Planet>> {
    try {
      return (await this.swapi(`/planets`)) as Array<Planet>;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findPlanet(id: string): Promise<Planet> {
    try {
      return (await this.swapi(`/planets/${id}`)) as Planet;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
