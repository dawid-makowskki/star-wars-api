import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { SwapiService } from 'src/swapi/swapi.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, SwapiService],
})
export class ApiModule {}
