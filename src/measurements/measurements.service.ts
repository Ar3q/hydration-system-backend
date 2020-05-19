import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(
    deviceName: string,
    measurementId: string,
  ): Promise<Measurement> {
    const found = await this.measurementModel.findOne({
      _id: measurementId,
      device: deviceName,
    });

    if (!found) {
      throw new NotFoundException(
        `Measurement with id: ${measurementId} for device: ${deviceName} not found`,
      );
    }

    return found;
  }

  async delete(
    deviceName: string,
    measurementId: string,
  ): Promise<{ numberOfDeletedRows: number }> {
    let numberOfDeletedRows;
    try {
      numberOfDeletedRows = await this.measurementModel.deleteOne({
        _id: measurementId,
        device: deviceName,
      });
      numberOfDeletedRows = numberOfDeletedRows.deletedCount;
    } catch (error) {
      console.error(error);
    }

    return { numberOfDeletedRows };
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
        createMeasurementDto.liquidLevel = Boolean(data);
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
