import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth2/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesSchema } from './models/roles.model';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule global
  }),
  MongooseModule.forRoot('mongodb://localhost:27017/CarRentalApp'),
    AdminModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
