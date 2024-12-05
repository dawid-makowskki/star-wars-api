import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SwapiService } from './swapi/swapi.service';

@Module({
  imports: [
    ApiModule,
    CacheModule.register({ ttl: 10 * 1000, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
