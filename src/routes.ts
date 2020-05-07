import { Routes } from 'nest-router';
import { AppModule } from './app.module';
import { DevicesModule } from './devices/devices.module';
import { MeasurementsModule } from './measurements/measurements.module';

export const routes: Routes = [
  {
    path: 'api',
    module: AppModule,
    children: [
      {
        path: '/devices',
        module: DevicesModule,
        children: [
          {
            path: '/:deviceId/measurements',
            module: MeasurementsModule,
          },
        ],
      },
    ],
  },
];
