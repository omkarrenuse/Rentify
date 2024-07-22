import { BadRequestException, Body, Controller, Get, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCartDto } from './dtos/update-cart.dto';

@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('hi')
    async hello() {
        console.log("controller")
        const hello = await this.userService.getHello();
        return {
            data: hello
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('plan')
    async addPlan(@Req() req, @Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date) {
        let reqStartDate; 
        let reqEndDate;
        if (startDate && endDate) {
            try {
                reqStartDate = new Date(startDate)
                reqEndDate = new Date(endDate)
                if (isNaN(reqStartDate.getTime()) || isNaN(reqEndDate.getTime())) {
                    throw new Error('Invalid date format');
                }
            } catch (e) {
                throw new BadRequestException('Invalid date format provided');
            }
        }else{
            const now = new Date();
            reqStartDate = new Date(now.getTime());
            reqEndDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
        }
        const userId = req.user.userId;
        const plan = await this.userService.addPlan(userId, reqStartDate, reqEndDate);
        return {
            message: 'Plan added successfully',
            data: plan
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('allvehicles')
    async getAllVehicles(@Query('id') id: string, @Query('search') search: any, @Query('startDateTime') startDate: string, @Query('endDateTime') endDate: string) {
        let reqStartDate, reqEndDate;
        try {
            reqStartDate = new Date(startDate)
            reqEndDate = new Date(endDate)
            if (isNaN(reqStartDate.getTime()) || isNaN(reqEndDate.getTime())) {
                throw new Error('Invalid date format');
            }
        } catch (e) {
            throw new BadRequestException('Invalid date format provided');
        }
        const vehicles = await this.userService.getAllVehicles(id, reqStartDate, reqEndDate, search);
        return {
            message: "Vehicles Data Fetched Successfully",
            data: vehicles
        }
    }

    //need to take startDate and EndDate as input again as confirmation
    @UseGuards(AuthGuard('jwt'))
    @Get('cart')
    async getCart(@Req() req) {
        const userid = req.user.userId
        const cart = await this.userService.getCartWithBill(userid);
        return {
            message: "Cart Data Fetched Successfully",
            data: cart
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('addToCart')
    async addToCart(@Req() req, @Query('vehicleId') vehicleId: string) {
        const userid = req.user.userId
        const cart = await this.userService.addToCart(userid, vehicleId);
        return {
            message: "Cart Data Fetched Successfully",
            data: cart
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateCart')
    async updateCart(@Req() req, @Body() updateCartData: UpdateCartDto) {
        const userid = req.user.userId
        const cart = await this.userService.updateCart(userid, updateCartData);
        return {
            message: "Cart Data Fetched Successfully",
            data: cart
        }
    }

}
