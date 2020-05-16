import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices/devices.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RouterModule.forRoutes(routes),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configSerivce: ConfigService) => {
        const user = configSerivce.get('MONGODB_USER');
        const password = configSerivce.get('MONGODB_PASS');
        const host = configSerivce.get('MONGODB_HOST');
        const port = configSerivce.get('MONGODB_PORT');

        const uri = `mongodb://${user}:${password}@${host}:${port}`;

        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    DevicesModule,
    MeasurementsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
