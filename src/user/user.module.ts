import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from 'src/models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VehicleSchema } from 'src/models/vehicles.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Vehicles', schema: VehicleSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
