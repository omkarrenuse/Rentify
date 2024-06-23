import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth2/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI),
    AdminModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
