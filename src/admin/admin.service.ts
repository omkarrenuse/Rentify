import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from 'src/models/media.model';
import { Roles } from 'src/models/roles.model';
import { Vehicles } from 'src/models/vehicles.schema';
import { AddVehicleDto } from './dto/add- vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Vehicles') private readonly vehiclesModel: Model<Vehicles>,
    @InjectModel('Roles') private readonly RolesModel: Model<Roles>,
    @InjectModel('Media') private readonly MediaModel: Model<Media>,
  ) { }

  async addRoles(rolesData) {
    const { role } = rolesData;
    const addRole = await this.RolesModel.create({
      role: role
    })
    return addRole
  }

  async upload(authorId, fileName, fileType, filePath) {

    const media = await this.MediaModel.create({
      data: {
        creatorId: authorId,
        fileName: fileName,
        filePath: filePath,
        fileType: fileType
      }
    })
    return media.id;

  }

  async addVehicle(vehicleData, mediaId) {
    const { carLicenseNumber, manufacturer, carModel, vehicleType, vehicleCapacity, basePrice, PPH, securityDeposit } = vehicleData;

    const newVehicle = await this.vehiclesModel.create({
      mediaId: mediaId,
      carLicenseNumber,
      manufacturer,
      carModel,
      vehicleType,
      vehicleCapacity,
      basePrice,
      PPH,
      securityDeposit
    })

    return newVehicle;
  }

  async updateVehicle(vehicleData: UpdateVehicleDto) {
    const { id, carLicenseNumber, manufacturer, carModel, vehicleType, vehicleCapacity, basePrice, PPH, securityDeposit
    } = vehicleData;

    const updateFields = {};
    for (const key in vehicleData) {
      if (vehicleData[key] !== undefined) {
        updateFields[key] = vehicleData[key];
      }
    }
    const updatedVehicle = await this.vehiclesModel.updateOne({_id: id} , {$set: updateFields}).exec();
    return updatedVehicle;
  }

  async deleteVehicle(id: string){
    const deletedVehicle = await this.vehiclesModel.deleteOne({_id: id}).exec();
  }

}
