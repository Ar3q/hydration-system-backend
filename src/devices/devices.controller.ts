import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DevicesService } from './devices.service';

@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll() {
    return await this.devicesService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) createDeviceDto: CreateDeviceDto) {
    return await this.devicesService.create(createDeviceDto);
  }

  @Get('/:device')
  async findById(@Param('device') deviceId: string) {
    return await this.devicesService.findById(deviceId);
  }
}
