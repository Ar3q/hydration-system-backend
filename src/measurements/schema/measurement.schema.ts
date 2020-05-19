import * as mongoose from 'mongoose';

export const MeasurementSchema = new mongoose.Schema({
  liquidLevel: { type: Boolean },
  moisture: { type: Number, min: 0, max: 4095 },
  device: { type: 'String', ref: 'Device' },
  date: {
    type: Date,
    default: Date.now,
  },
});
