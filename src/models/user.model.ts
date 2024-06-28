import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const getPlanToDefault = () => {
    const now = new Date();
    return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
};

export const UserSchema = new mongoose.Schema({
    name: { type: String },
    phone_number: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    birthDate: { type: Date, required: true },
    roleId: { type: ObjectId, required: true, ref: 'RolesSchema' },
    carsRented: [{ type: ObjectId, ref: 'CarsSchema' }],
    planFrom: { type: Date, required: true, default: Date.now },
    planTo: { type: Date, required: true, default: getPlanToDefault },
    created_at: { type: Date, default: Date.now },
    is_deleted: { type: Boolean, required: false, default: 0 }
});

export interface User extends Document {
    _id: string,
    phone_number: string,
    email: string,
    password: string,
    gender: string,
    birthDate: Date,
    roleId: mongoose.Types.ObjectId,
    carsRented: mongoose.Types.ObjectId[],
    planFrom: Date,
    planTo: Date,
    created_at: Date,
    is_deleted: boolean
}
