import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

export const RolesSchema = new mongoose.Schema({
    role: { type: String },
    createdAt: { type: Date.now(), required: true },
    isDeleted: { type: Boolean, default: false, required: true },
})

export interface Role extends Document{
   _id: string;
   role: string;
   createdAt: Date;
    isDeleted: boolean;

}