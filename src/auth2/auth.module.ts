import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth2/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/user.model";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT_EXPIRES')
                    }
                }
            }
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }