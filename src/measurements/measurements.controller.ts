import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { Measurement } from './interfaces/measurement.interface';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

@Controller()
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Get()
  async findAll(@Param('deviceId') deviceName: string): Promise<Measurement[]> {
    return this.measurementsService.findAll(deviceName);
  }

  @Post()
  async create(
    @Body(ValidationPipe) createMeasurementDto: CreateMeasurementDto,
    @Param('deviceId') deviceName: string,
  ) {
    return this.measurementsService.create(createMeasurementDto, deviceName);
  }
}
