import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>){}
    
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
