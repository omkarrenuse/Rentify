import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/models/user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RolesSchema } from 'src/models/roles.model';
import { AuthModule } from 'src/auth2/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule,JwtModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Roles', schema: RolesSchema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
