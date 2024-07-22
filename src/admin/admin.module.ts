import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/models/user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RolesSchema } from 'src/models/roles.model';
import { JwtModule } from '@nestjs/jwt';
import { VehicleSchema } from 'src/models/vehicles.schema';
import { S3ManagerModule } from 'src/s3-manager/s3-manager.module';
import { MediaSchema } from 'src/models/media.model';

@Module({
  imports: [JwtModule,
    MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema },{ name: 'Vehicles', schema: VehicleSchema},{name: 'Media', schema: MediaSchema}]),
    S3ManagerModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
