import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  _id: { type: String },
  description: { type: String },
});
