import { Document } from 'mongoose';

export interface Measurement extends Document {
  readonly moisture: number;
  readonly liquidLevel: number;
}
