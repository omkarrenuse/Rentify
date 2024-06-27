import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/models/cart.model';
import { User } from 'src/models/user.model';
import { Vehicles } from 'src/models/vehicles.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Vehicles') private readonly vehicleModel: Model<Vehicles>,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>) { }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async getAllVehicles(id: string, search: any) {
    let allvehicles;
    let capacity;
    try {
      capacity = Number(search)
    } catch {
      capacity = null
    }
    if (id) {
      allvehicles = await this.vehicleModel.find({ _id: id }).exec();
    } else if (capacity) {
      allvehicles = await this.vehicleModel.find({ vehicleCapacity: capacity }).exec();
    } else if (search) {
      allvehicles = await this.vehicleModel.find({
        $or: [
          { manufacturer: search },
          { carModel: search },
        ]
      }).exec();
    } else {
      allvehicles = await this.vehicleModel.find().exec();
    }
    if (!allvehicles) {
      throw new NotFoundException('No matching vehicles found')
    }
    return allvehicles;
  }

  async getCart(userId: string){
    return await this.cartModel.find({ _id:userId}).exec();
  }

 async addToCart(userId: string, vehicleId: string, time: number): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex((item) => item.vehicleId === vehicleId);
    if (existingItemIndex !== -1) {
      // Product exists in cart, update quantity
      cart.items[existingItemIndex].time += time;
    } else {
      // Product does not exist in cart, add new item
      cart.items.push({vehicleId, time});
    }

    // Save the updated cart
    return await cart.save();
  }

  
}
