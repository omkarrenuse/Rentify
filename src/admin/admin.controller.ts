import { Body, Controller, Get, Logger, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { AddRolesDto } from './dto/add-roles.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth2/strategies/jwt.strategy';
import { RoleGuard } from 'src/auth2/role.guard';
import { Roles } from 'src/auth2/roles.decorator';
import { AddVehicleDto } from './dto/add- vehicle.dto';

@Controller('admin')
@UseInterceptors(LoggingInterceptor)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @UseGuards(AuthGuard("jwt"))
    @UseGuards(RoleGuard)
    @Roles('Admin')
    @Post('addrole')
    async addRoles(@Body() rolesData: AddRolesDto) {
        const roles = await this.adminService.addRoles(rolesData);
        return {
            message: "Role added sucessfully",
            data:roles
        };
    }

    @UseGuards(AuthGuard("jwt"))
    @UseGuards(RoleGuard)
    @Roles('Admin')
    @Post('addvehicle')
    async addVehicle(@Body() vehicleData: AddVehicleDto) {
        const roles = await this.adminService.addVehicle(vehicleData);
        return {
            message: "Vehicle added sucessfully",
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
