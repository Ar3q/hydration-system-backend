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
  async findById(@Param('device') deviceId: string): Promise<Device> {
    return await this.devicesService.findById(deviceId);
  }

  @Delete('/:device')
  async delete(@Param('device') deviceId: string) {
    return await this.devicesService.delete(deviceId);
  }

  @Patch('/:device')
  async update(
    @Body(ValidationPipe) updateDeviceDto: UpdateDeviceDto,
    @Param('device') deviceId: string,
  ) {
    const x = await this.devicesService.update(deviceId, updateDeviceDto);
    console.log(x);
    return x;
  }
}
