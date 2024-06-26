import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  mediaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MediaSchema'
  },
  carLicenseNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  manufacturer: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  carModel: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  PPH: {
    type: Number,
    required: true
  },
  securityDeposit: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  vehicleCapacity: {
    type: Number,
    required: true
  },
  // dateTimeFrom: {
  //   type: Date,
  //   required: true
  // },
  // dateTimeto: {
  //   type: Date,
  //   required: true
  // },
  isBooked: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: 0
  }
});

export interface Vehicles extends Document {
  _id: string;
  carLicenseNumber: string;
  manufacturer: string;
  carModel: string;
  basePrice: number;
  PPH: number;
  securityDeposit: number;
  vehicleType: string;
  vehicleCapacity: number;
  // dateTimeFrom: Date;
  // dateTimeto: Date;
  isBooked: boolean;
  created_at: Date;
  is_deleted: boolean;
}
