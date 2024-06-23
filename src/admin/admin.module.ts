import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from 'src/models/user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Admin', schema: UserSchema}])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
