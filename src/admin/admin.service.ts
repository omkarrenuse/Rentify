import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private readonly adminModel: Model<User>){}
    getHello(): string {
        return 'Hello World!';
      }
}
