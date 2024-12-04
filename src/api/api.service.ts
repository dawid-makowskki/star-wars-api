import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { $Fetch, ofetch } from 'ofetch';
import { PaginatedResource, SwapiResource } from 'src/types/types';

@Injectable()
export class ApiService {
  private readonly swapi: $Fetch;

  constructor() {
    this.swapi = ofetch.create({ baseURL: 'https://swapi.dev/api' });
  }

  async findAll<T>(
    endpoint: string,
    query: Record<string, string>,
    page: number,
  ): Promise<PaginatedResource<T>> {
    try {
      const swapiResponse = (await this.swapi(endpoint)) as SwapiResource<T>;
      return this.resourceFilter(swapiResponse.results, page, query);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne<T>(endpoint: string, id: string): Promise<T> {
    try {
      return (await this.swapi(`/${endpoint}/${id}`)) as T;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  private resourceFilter<T>(
    data: Array<T>,
    page: number,
    query: Record<string, string>,
  ): PaginatedResource<T> {
    let filteredResults = data.filter((result) => {
      return Object.entries(query).every(([key, val]) => {
        if (key === 'page') return true;
        return (
          result[key]?.toLowerCase() === val.toLowerCase() ||
          result[key]?.toLowerCase().includes(val.toLowerCase())
        );
      });
    });
    const pageLength = 2;

    const pages = Math.round(filteredResults.length / pageLength);

    if (page > 0) {
      const start = (page - 1) * pageLength;
      const end = start + pageLength;
      filteredResults = filteredResults.slice(start, end);
    }

    return {
      page,
      pages,
      data: filteredResults,
    };
  }
}
