// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { AdministratorService } from 'src/administrator/administrator.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { S3ManagerService } from 'src/s3-manager/s3-manager.service';


// @Module({
//   imports: [
//     PrismaModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: configService.get<string | number>('JWT_EXPIRES') },
//       }),
//       inject: [ConfigService],
//     }),
//   ],

//   providers: [AuthService, UsersService, AdministratorService, ConfigService,S3ManagerService],
//   exports: [AuthService, JwtModule],
// })
// export class AuthModule { }




