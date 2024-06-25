import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/models/user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RolesSchema } from 'src/models/roles.model';
import { JwtModule } from '@nestjs/jwt';
import { VehicleSchema } from 'src/models/vehicles.schema';

@Module({
  imports: [JwtModule,MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema },{ name: 'Vehicles', schema: VehicleSchema}])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
