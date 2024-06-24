import { Body, Controller, Get, Logger, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { AddRolesDto } from './dto/add-roles.dto';
import { AuthGuard } from 'src/auth2/auth.guard';

@Controller('admin')
@UseInterceptors(LoggingInterceptor)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @UseGuards(AuthGuard)
    @Post('addrole')
    async addRoles(@Body() rolesData: AddRolesDto) {
        const roles = await this.adminService.addRoles(rolesData);
        return {
            message: "Role added sucessfully",
            data:roles
        };
    }

    @Get('hello')
    async hello() {
        console.log("hello ")
    }

    @Post()
    async login() {

    }
}
