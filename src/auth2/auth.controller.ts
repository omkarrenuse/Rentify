import { Body, Controller, Logger, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoggingInterceptor } from "src/client/interceptors/logging.interceptor";

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    async signUp(@Body() registerUserDto: RegisterUserDto): Promise<{ token: string }> {
        return this.authService.signUp(registerUserDto);
    }
}