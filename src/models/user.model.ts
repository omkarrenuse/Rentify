import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

export const UserSchema = new mongoose.Schema({
    name: { type: String },
    phone_number: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    birthDate: { type: Date, required: true },
    roleId: { type: ObjectId, required: true, ref: 'RolesSchema' },
    carsRented: [{ type: ObjectId, ref: 'CarsSchema' }],
    created_at: { type: Date, default: new Date() },
    is_deleted: { type: Boolean, required: false, default: 0 }
})

export interface User extends Document {
    _id: string,
    phone_number: string,
    email: string,
    password: string,
    gender: number,
    birthDate: Date,
    roleId: [number]
    carsRented: [number]
    created_at: Date,
    is_deleted: boolean
}