import mongoose from "mongoose";

export const MediaSchema = new mongoose.Schema({
    creatorId: {type: String},
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String },
    createdAt: { type: Date, required: true, default: new Date() },
    isDeleted: { type: Boolean, default: false, required: true },
})

export interface Media extends Document {
    _id: string;
    creatorId: string;
    fileName: string;
    filePath: string;
    fileType: string;
    createdAt: Date;
    isDeleted: boolean;

}

