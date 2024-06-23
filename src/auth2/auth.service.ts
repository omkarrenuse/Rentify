import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {UserSchema, User} from '../models/user.model'
import { Model } from "mongoose";

@Injectable()
export class AuthService {
    constructor(
       @InjectModel('User') private readonly userModel:Model<User>
    ){}

    
}