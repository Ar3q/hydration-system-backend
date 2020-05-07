import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementSchema } from './schema/measurement.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementsController } from './measurements.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Measurement', schema: MeasurementSchema },
    ]),
  ],
  providers: [MeasurementsService],
  controllers: [MeasurementsController],
})
export class MeasurementsModule {}
