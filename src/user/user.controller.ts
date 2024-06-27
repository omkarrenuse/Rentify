import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dtos/login.users.dto';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('hi')
    async hello(){
        console.log("controller")
        const hello = await this.userService.getHello();
        return {
            data:hello
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('allvehicles')
    async getAllVehicles(@Query('id') id:string, @Query('search') search: any){
        const vehicles = await this.userService.getAllVehicles(id, search);
        return {
            message: "Vehicles Data Fetched Successfully",
            data: vehicles
        }
    }


    @Post()
    async login(){
        
    }


    // @Post()
    // async create(@Body() RegisterUserDto: RegisterUserDto) {
    //   try {
    //     await this.userService.create(RegisterUserDto);
    //   } catch (error) {
    //     console.log(error);
    //     return { error: true, code: 111 };
    //   }
    //   let session = SHA256(randomstring.generate()).toString("hex");
    //   await this.userService.updateUsersSession(RegisterUserDto.email, session);
    //   return { error: false, session: session };
    // }

    // @Post()
    // async auth(@Body() userLoginDto: UserLoginDto) {
    //   const givenPasswordHash: string = userLoginDto.password;
    //   console.log(userLoginDto);
    //   const user: any = await this.loginUsersService.getUserByEmail(
    //     userLoginDto.email
    //   );
    //   if (user === null) {
    //     return { error: true, code: 101 };
    //   }
  
    //   if (givenPasswordHash !== user.password) {
    //     return { error: true, code: 102 };
    //   }
  
    //   let session = SHA256(randomstring.generate()).toString("hex");
    //   await this.loginUsersService.updateUsersSession(user.email, session);
    //   return { error: false, session: session };
    // }
}
