import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices/devices.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    // TODO: environmental variable for mongo url
    MongooseModule.forRoot('mongourl'),
    DevicesModule,
    MeasurementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
