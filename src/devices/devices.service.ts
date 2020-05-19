import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './interfaces/device.interface';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IdDuplicatCode } from 'src/constants/mongo-error-codes';
import { UpdateDeviceDto } from './dto/update-device.dto';

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
    const foundDevice = await this.deviceModel.findById(id).exec();
    if (!foundDevice) {
      throw new NotFoundException(`Device with id/name: ${id} not found`);
    }
    return foundDevice;
  }

  findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async delete(deviceId: string): Promise<{ numberOfDeletedRows: number }> {
    let numberOfDeletedRows;
    try {
      numberOfDeletedRows = (
        await this.deviceModel.deleteOne({ _id: deviceId })
      ).deletedCount;
    } catch (error) {
      console.error(error);
    }

    if (!numberOfDeletedRows) {
      throw new NotFoundException(
        `Device with id/name: ${deviceId} not found, so not deleted`,
      );
    }

    return { numberOfDeletedRows };
  }

  async update(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    const updatedDevice = await this.deviceModel.findByIdAndUpdate(
      deviceId,
      {
        ...updateDeviceDto,
      },
      { new: true },
    );

    if (!updatedDevice) {
      throw new NotFoundException(
        `Device with id/name: ${deviceId} not found, so not updated`,
      );
    }

    return updatedDevice;
  }
}
