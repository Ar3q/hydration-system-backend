import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DevicesService } from './devices.service';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './interfaces/device.interface';
import {
  ApiTags,
  ApiParam,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('devices')
@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll() {
    return await this.devicesService.findAll();
  }

  @ApiConflictResponse({
    description:
      'Trying to create a new device with name, that is already used by other one (name used as _id, so need to be unique)',
  })
  @ApiCreatedResponse()
  @Post()
  async create(@Body(ValidationPipe) createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Get('/:deviceId')
  async findById(@Param('deviceId') deviceId: string): Promise<Device> {
    return await this.devicesService.findById(deviceId);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete('/:deviceId')
  async delete(@Param('deviceId') deviceId: string) {
    return await this.devicesService.delete(deviceId);
  }

  @ApiParam({
    name: 'deviceId',
    example: 'pomps_device',
    description: 'Device _id (which is also its name)',
  })
  @Patch('/:deviceId')
  async update(
    @Body(ValidationPipe) updateDeviceDto: UpdateDeviceDto,
    @Param('deviceId') deviceId: string,
  ) {
    return await this.devicesService.update(deviceId, updateDeviceDto);
  }
}
