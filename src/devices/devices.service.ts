import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './interfaces/device.interface';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IdDuplicatCode } from 'src/constants/mongo-error-codes';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel('Device') private readonly deviceModel: Model<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const { name } = createDeviceDto;

    const createdDevice = new this.deviceModel({
      _id: name,
      ...createDeviceDto,
    });

    let savedDevice;

    try {
      savedDevice = await createdDevice.save();
    } catch (error) {
      console.error(error);
      if (error.code === IdDuplicatCode) {
        throw new ConflictException(
          `Cannot create device with name: ${name} as id, because it seems there is already device with that name/id`,
        );
      }
    }

    return savedDevice;
  }

  async findById(id: string): Promise<Device> {
    return await this.deviceModel.findById(id).exec();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }
}
