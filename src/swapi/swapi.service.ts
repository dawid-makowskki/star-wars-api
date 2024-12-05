import { Injectable } from '@nestjs/common';
import { ofetch, $Fetch } from 'ofetch';
import { SwapiResource } from 'src/types/types';

@Injectable()
export class SwapiService {
  private readonly swapi: $Fetch;

  constructor() {
    this.swapi = ofetch.create({ baseURL: 'https://swapi.dev/api' });
  }

  async fetchMany<T>(endpoint: string): Promise<SwapiResource<T>> {
    return (await this.swapi(`/${endpoint}`)) as SwapiResource<T>;
  }

  async fetchOne<T>(endpoint: string, id: string): Promise<T> {
    return (await this.swapi(`/${endpoint}/${id}`)) as T;
  }
}
