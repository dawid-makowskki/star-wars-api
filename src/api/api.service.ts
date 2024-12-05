import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SwapiService } from '../swapi/swapi.service';
import { PaginatedResource, SwapiResource } from 'src/types/types';

@Injectable()
export class ApiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly swapiService: SwapiService
  ) {}

  async findAll<T>(
    endpoint: string,
    query: Record<string, string>,
    page: number,
  ): Promise<PaginatedResource<T>> {
    const key = this.getCacheKey({
      endpoint,
      query,
      params: {},
    });
    try {
      const cached = await this.getFromCache(key);

      if (cached) {
        return cached as PaginatedResource<T>;
      }

      const swapiResponse = (await this.swapiService.fetchMany(endpoint)) as SwapiResource<T>;
      const paginatedResource = this.resourceFilter(
        swapiResponse.results,
        page,
        query,
      );
      this.addToCache(key, paginatedResource);
      return paginatedResource;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne<T>(endpoint: string, id: string): Promise<T> {
    const key = this.getCacheKey({
      endpoint,
      params: {
        id,
      },
      query: {},
    });
    try {
      const cached = await this.getFromCache(key);
      if (cached) {
        return cached as T;
      }
      const swapiResult = (await this.swapiService.fetchOne(endpoint, id)) as T;
      this.addToCache(key, swapiResult);
      return swapiResult;
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

  private async getFromCache(key: string): Promise<unknown> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      throw new Error(`Could not get item from cache: ${error}`);
    }
  }

  private async addToCache(key: string, data: any): Promise<void> {
    try {
      await this.cacheManager.set(key, data);
    } catch {
      throw new Error('Could not set cache object');
    }
  }

  private getCacheKey({
    endpoint,
    params,
    query,
  }: {
    endpoint: string;
    params: Record<string, string>;
    query: Record<string, string>;
  }): string {
    const serializedParams = Object.keys(params)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => `${key}=${params[key]}`)
      .join('_');

    const serializedQuery = Object.keys(query)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => `${key}=${query[key]}`)
      .join('_');

    return `${endpoint}${serializedParams}${serializedQuery}`;
  }
}
