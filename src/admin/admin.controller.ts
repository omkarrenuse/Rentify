import { Body, Controller, Delete, Get, Logger, Param, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoggingInterceptor } from 'src/client/interceptors/logging.interceptor';
import { AddRolesDto } from './dto/add-roles.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AddVehicleDto } from './dto/add- vehicle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3ManagerService } from 'src/s3-manager/s3-manager.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('admin')
@UseInterceptors(LoggingInterceptor)
export class AdminController {
    constructor(private readonly adminService: AdminService,
        private readonly s3Service: S3ManagerService,   
        private readonly jwtService: JwtService
    ) { }

    @UseGuards(AuthGuard("jwt"))
    @UseGuards(RoleGuard)
    @Roles('Admin')
    @Post('addrole')
    async addRoles(@Body() rolesData: AddRolesDto) {
        const roles = await this.adminService.addRoles(rolesData);
        return {
            message: "Role added sucessfully",
            data: roles
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RoleGuard)
    @Roles('Admin')
    @Post('addvehicle')
    @UseInterceptors(FileInterceptor('file'))
    async addNewVehicle(
        @Body() vehicleData: AddVehicleDto,
        @Req() req,
        @UploadedFile() file: Express.Multer.File,) {

        let fileUrl;
        let mediaId;
        let id;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = this.jwtService.decode(token)  
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            id = decoded.id
        }      

        if (file) {
            // Handle file-based media upload
            const fileName = file.originalname
            let newVehicle;
            fileUrl = await this.s3Service.uploadMedia(file, fileName);

            let png = file.originalname.includes('.png')
            let jpg = file.originalname.includes('.jpg')
            let jpeg = file.originalname.includes('.jpeg')
            let mp4 = file.originalname.includes('.mp4')
            let webp = file.originalname.includes('webp')
            let heic = file.originalname.includes('heic')
            let mov = file.originalname.includes('mov')
            const myFile = file.originalname.split('.')
            const name = png == true ? file.originalname.split('.png') : jpg == true ? file.originalname.split('.jpg') : jpeg == true ? file.originalname.split('.jpeg') : mp4 == true ? file.originalname.split('.mp4') : webp == true ? file.originalname.split('.webp') : heic == true ? file.originalname.split('.heic') : mov == true ? file.originalname.split('.mov') : null;
            const fileType = myFile[myFile.length - 1]


            if (fileUrl) {
                let type;
                if (fileType == "mp4" || fileType == 'mov') {
                    type = "VIDEO"
                } else {
                    type = "IMAGE"
                }
                mediaId = await this.adminService.upload(id, fileName, type, fileUrl)
                if (mediaId) {
                    newVehicle = await this.adminService.addVehicle(vehicleData, mediaId);
                    return {
                        message: "Vehicle added sucessfully",
                        data: newVehicle
                    };
                }
            } else {
                throw new Error('Error in uploading media');
            }
        } else {
            throw new Error('No file provided');
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @UseGuards(RoleGuard)
    @Roles('Admin')
    @Post('updatevehicle')
    async updateVehicle(@Body() vehicleData: UpdateVehicleDto) {
        const updatedVehicle = await this.adminService.updateVehicle(vehicleData);
        return {
            message: "Role added sucessfully",
            data: updatedVehicle
        };
    }

    @Delete('deletevehicle/:id')
    async deleteVehicle(@Param('id') id: string ){
        const deletedVehicle = await this.adminService.deleteVehicle(id);
        return {
            message: 'Vehicle Deleted Successfully',
            data: deletedVehicle
        }
    }

    @Get('hello')
    async hello() {
        console.log("hello ")
    }

    @Post()
    async login() {

    }
}
