import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/auth2/auth.service";
import { GoogleStrategy } from "./google.strategy";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/models/user.model";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.registerAsync({
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
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
    exports: [AuthService]
})
export class AuthModule { }