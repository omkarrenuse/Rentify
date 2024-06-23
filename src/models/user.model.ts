import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

export const UserSchema = new mongoose.Schema({
    name: { type: String },
    mobile: { type: Number, required: true },
    //totalPrice: { type: Number, required: true },
    roleId:{ type:Number, required:true},
    carsRented: [{ type: ObjectId, ref: 'CarsSchema'}]
})

export interface User extends Document{
    id: string,
    mobile: string,
    totalPrice: number,
    roleId:[number]
    carsRented: [number]
}