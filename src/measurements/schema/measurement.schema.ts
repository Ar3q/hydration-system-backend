import * as mongoose from 'mongoose';

export const MeasurementSchema = new mongoose.Schema({
  liquidLevel: { type: Number },
  moisture: { type: Number, min: 0, max: 100 },
  device: { type: 'String', ref: 'Device' },
  date: {
    type: Date,
    default: Date.now,
  },
});
