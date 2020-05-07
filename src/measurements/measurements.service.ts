import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement } from './interfaces/measurement.interface';
import { Model } from 'mongoose';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

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
}
