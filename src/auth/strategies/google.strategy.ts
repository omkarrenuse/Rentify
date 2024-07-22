import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { verifyCallback, Strategy } from "passport-google-oauth20"
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
            scope: ['email', 'profile']
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: verifyCallback): Promise<any> {
        console.log(profile)
        const user = await this.authService.validateGoogleUser(profile);
        console.log(user)
        done(null, user)
    }
}