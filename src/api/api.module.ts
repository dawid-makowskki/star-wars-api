import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { SwapiService } from 'src/swapi/swapi.service';
import { WordFinderService } from 'src/word-finder/word-finder.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, SwapiService, WordFinderService],
})
export class ApiModule {}
