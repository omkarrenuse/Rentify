import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('signup')
    async signUp(@Body() registerUserDto: RegisterUserDto): Promise<{ token: string }> {
        return this.authService.signUp(registerUserDto);
    }
}