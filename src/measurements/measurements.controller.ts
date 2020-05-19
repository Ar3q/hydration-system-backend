import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { Measurement } from './interfaces/measurement.interface';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { Ctx, MqttContext, Payload, EventPattern } from '@nestjs/microservices';

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

  @Get('/:measurementId')
  async findById(
    @Param('deviceId') deviceName: string,
    @Param('measurementId') measurementId: string,
  ) {
    return this.measurementsService.findById(deviceName, measurementId);
  }

  @Delete('/:measurementId')
  async delete(
    @Param('deviceId') deviceName: string,
    @Param('measurementId') measurementId: string,
  ) {
    return this.measurementsService.delete(deviceName, measurementId);
  }

  @EventPattern('devices/+/+')
  test(@Payload() data, @Ctx() context: MqttContext) {
    this.measurementsService.createFromMQTTMessage(data, context.getTopic());
  }
}
