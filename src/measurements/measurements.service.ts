import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './interfaces/measurement.interface';
import { Model } from 'mongoose';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel('Measurement')
    private readonly measurementModel: Model<Measurement>,
  ) {}

  async create(
    createMeasurementDto: CreateMeasurementDto,
    device: string,
  ): Promise<Measurement> {
    const createdMeasurement = new this.measurementModel({
      device,
      ...createMeasurementDto,
    });

    let savedMeasurement;

    try {
      savedMeasurement = await createdMeasurement.save();
    } catch (error) {
      console.error(error);
    }

    return savedMeasurement;
  }

  async findAll(deviceName: string): Promise<Measurement[]> {
    return this.measurementModel.find({ device: deviceName }).exec();
  }

  async createFromMQTTMessage(
    data: string,
    topic: string,
  ): Promise<Measurement> {
    const device = topic.split('/')[1];
    const typeOfMeasurement = topic.split('/')[2];

    const createMeasurementDto: CreateMeasurementDto = new CreateMeasurementDto();

    switch (typeOfMeasurement) {
      case 'moisture':
        createMeasurementDto.moisture = Number(data);
        break;
      case 'liquid_level':
        createMeasurementDto.liquidLevel = Number(data);
        break;
      default:
        console.error(`Unknown type of measurement: ${typeOfMeasurement}`);
        return;
    }

    try {
      await validateOrReject(createMeasurementDto);
    } catch (error) {
      console.error(error);
      return;
    }

    return this.create(createMeasurementDto, device);
  }
}
