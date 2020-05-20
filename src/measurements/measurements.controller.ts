import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Measurement } from './interfaces/measurement.interface';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { Ctx, MqttContext, Payload, EventPattern } from '@nestjs/microservices';
import {
  ApiTags,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { DateRangeDto } from './dto/date-range.dto';
import { ParseDatePipe } from 'src/common/pipes/ParseDate.pipe';

@ApiTags('measurements')
@Controller()
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @ApiQuery({
    name: 'startDate',
    description:
      'Allow to get measurements that was created after passed date. Format: ISO_8601',
    example: '2020-05-19',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    description:
      'Allow to get measurements that was created before passed date. Format: ISO_8601',
    example: '2020-05-20T06:53:26.292Z',
    required: false,
  })
  @Get()
  async findAll(
    @Param('deviceId') deviceName: string,
    @Query(ValidationPipe, ParseDatePipe) dateRangeDto: DateRangeDto,
  ): Promise<Measurement[]> {
    return this.measurementsService.findAll(deviceName, dateRangeDto);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @Post()
  async create(
    @Body(ValidationPipe) createMeasurementDto: CreateMeasurementDto,
    @Param('deviceId') deviceName: string,
  ) {
    return this.measurementsService.create(createMeasurementDto, deviceName);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @ApiParam({ name: 'measurementId', example: '5ec3f667640bd94113116b29' })
  @ApiNotFoundResponse({ description: "Measurement doesn't exist" })
  @ApiOkResponse()
  @Get('/:measurementId')
  async findById(
    @Param('deviceId') deviceName: string,
    @Param('measurementId') measurementId: string,
  ) {
    return this.measurementsService.findById(deviceName, measurementId);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @ApiParam({ name: 'measurementId', example: '5ec3f667640bd94113116b29' })
  @ApiNotFoundResponse({ description: "Measurement doesn't exist" })
  @ApiOkResponse()
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
