import { Document } from 'mongoose';

export interface Device extends Document {
  readonly name: string;
  readonly description: string;
}
