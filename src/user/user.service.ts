import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Vehicles } from 'src/models/vehicles.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>,
    @InjectModel('Vehicles') private readonly vehicleModel:Model<Vehicles>){}
    
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async getAllVehicles(){
    const allvehicles = await this.vehicleModel.find({})
    return allvehicles;
  }

  async searchVehicleByFilter(vehicleName: string, vehicleCapacity: number){
    const vehicle = await this.vehicleModel.find({ $or: [
      { manufacturer: vehicleName },
      { carModel: vehicleName },
      { vehicleCapacity: vehicleCapacity}
    ]})
  }
}
