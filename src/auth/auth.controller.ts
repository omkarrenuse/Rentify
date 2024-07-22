import { Body, Controller, Get, Logger, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoggingInterceptor } from "src/client/interceptors/logging.interceptor";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
    constructor(
        @InjectModel('User')
        private authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {console.log("googleAuth") }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        const id = req.user._id.toHexString();
        const roleId = req.user.roleId.toHexString();
        console.log("callback------------->", id)
        console.log("callback------------->", roleId)

        const token = this.jwtService.sign({ userId: id, roleId: roleId })
        return {
            statusCode: 200,
            token: token,
        };
    }

    @Post('signup')
    async signUp(@Body() registerUserDto: RegisterUserDto): Promise<{ token: string }> {
        return this.authService.signUp(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.authService.login(loginUserDto);
    }
}