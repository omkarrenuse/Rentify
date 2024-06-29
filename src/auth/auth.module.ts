import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/user.model";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { RolesSchema } from "src/models/roles.model";

@Module({
    imports: [ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: { expiresIn: configService.get<string | number>('JWT_EXPIRES') },
            }),
            inject: [ConfigService],
          }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{name:'Role', schema: RolesSchema}])
    ],
    controllers: [AuthController],
    providers: [AuthService,GoogleStrategy, JwtStrategy],
    exports: [AuthService, JwtModule, PassportModule]
})
export class AuthModule { }