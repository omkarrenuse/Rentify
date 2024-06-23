import { Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly appService: AdminService) { }

    @Get('hello')
    async hello(){
        console.log("hello ")
    }

    @Post()
    async login(){
        
    }
}
