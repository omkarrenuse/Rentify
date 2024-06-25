import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from 'src/models/roles.model';
import { Vehicles } from 'src/models/vehicles.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Vehicles') private readonly vehiclesModel: Model<Vehicles>,
    @InjectModel('Roles') private readonly RolesModel: Model<Roles>,
  ) { }

  async addRoles(rolesData) {
    const { role } = rolesData;
    const addRole = await this.RolesModel.create({
      role: role
    })
    return addRole
  }

  async addVehicle(vehicleData){
    const {carLicenseNumber,manufacturer,carModel, vehicleType, vehicleCapacity, basePrice ,PPH, securityDeposit} = vehicleData;

    const newVehicle = await this.vehiclesModel.create({
      carLicenseNumber,
      manufacturer,
      carModel,
      vehicleType, 
      vehicleCapacity, 
      basePrice ,
      PPH, 
      securityDeposit
    })

    return newVehicle;
  }
}
