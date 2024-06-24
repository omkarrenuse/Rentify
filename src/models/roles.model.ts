import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

export const RolesSchema = new mongoose.Schema({
    role: { type: String },
    createdAt: { type: Date, required: true, default: new Date() },
    isDeleted: { type: Boolean, default: false, required: true },
})

export interface Roles extends Document {
    _id: string;
    role: string;
    createdAt: Date;
    isDeleted: boolean;

}