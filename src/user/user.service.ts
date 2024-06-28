import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/models/cart.model';
import { User } from 'src/models/user.model';
import { Vehicles } from 'src/models/vehicles.schema';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { DuplicateItemException } from 'src/exception handling/exception';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Vehicles') private readonly vehicleModel: Model<Vehicles>,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>) { }

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async addPlan(userId: string, startDate: Date, endDate: Date){
    const planSchedule = await this.userModel.updateOne({_id: userId},{$set:{planFrom:startDate, planTo: endDate}})

    return planSchedule;
  }

  async getAllVehicles(id: string, reqStartDate, reqEndDate, search: any) {
    let allvehicles;
    let capacity;
    try {
      capacity = Number(search)
    } catch {
      capacity = null
    }
    if (id) {
      allvehicles = await this.vehicleModel.find({
        _id: id,
        $or: [
          { dateTimeFrom: { $gte: reqEndDate } },
          { dateTimeto: { $lte: reqStartDate } }
        ],
        is_deleted: false
      }).exec();
    } else if (capacity) {
      allvehicles = await this.vehicleModel.find({
        vehicleCapacity: capacity,
        $or: [
          { dateTimeFrom: { $gte: reqEndDate } },
          { dateTimeto: { $lte: reqStartDate } }
        ],
        is_deleted: false
      }).exec();
    } else if (search) {
      allvehicles = await this.vehicleModel.find({
        $or: [
          {
            manufacturer: search, $or: [
              { dateTimeFrom: { $gte: reqEndDate } },
              { dateTimeto: { $lte: reqStartDate } }
            ]
          },
          {
            carModel: search,
            $or: [
              { dateTimeFrom: { $gte: reqEndDate } },
              { dateTimeto: { $lte: reqStartDate } }
            ]
          },
        ],
        is_deleted: false,
      }).exec();
    } else {
      allvehicles = await this.vehicleModel.find({
        $or: [
          { dateTimeFrom: { $gte: reqEndDate } },
          { dateTimeto: { $lte: reqStartDate } }
        ],
        is_deleted: false
      }).exec();
    }
    if (!allvehicles) {
      throw new NotFoundException('No matching vehicles found')
    }
    return allvehicles;
  }

  async getCartWithBill(userId: string) {
    let GSTpercentage = 18;
    let totalBill = 0;
    let payPerHourCharges = 0;
    let totalDeposit = 0;
    const planSchedule = await this.userModel.findOne({_id: userId}).exec();

    const startDateTime = planSchedule.planFrom;
    const endDateTime = planSchedule.planTo;
    
    const cart =  await this.cartModel.findOne({userId:userId}).exec();
  
    for (const obj of cart.items){
      const vehicleId = obj.vehicleId

      const vehicleDetails = await this.vehicleModel.findOne({_id: vehicleId})

      const perHourCharge = vehicleDetails.PPH;
      console.log("PPH", perHourCharge)

      const deposit = vehicleDetails.securityDeposit;
      console.log("deposit",deposit)

      const totalHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
      console.log("totalHours", totalHours)

      payPerHourCharges += perHourCharge * totalHours;
      totalDeposit += deposit;
      totalBill += totalHours * perHourCharge + deposit;
    
    }
  
    console.log('Total Bill:', totalBill);

    const payPerHourChargesWithGST = payPerHourCharges + ((payPerHourCharges*GSTpercentage)/100)
    console.log("payPerHourChargesWithGST", payPerHourChargesWithGST)

    return { 
      ...cart.toObject(), 
      totalPerHourCharges: payPerHourCharges, 
      totalPerHourChargesWithGST: payPerHourChargesWithGST , 
      totalRefundableDeposit: totalDeposit, 
      totalBill 
    };

  }

  async addToCart(userId: string, vehicleId: string): Promise<Cart> {
    let cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      cart = await this.cartModel.create({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex((item) => item.vehicleId === vehicleId);

    if (existingItemIndex !== -1) {
      // Product exists in cart, update quantity
      throw new DuplicateItemException('Item already added in cart')
    } else {
      // Product does not exist in cart, add new item
      cart.items.push( {vehicleId:vehicleId} );
    }

    return cart.save();
  }

  async updateCart(userId: string, updateCartData: UpdateCartDto) {
    const { items } = updateCartData;
    const updateCart = await this.cartModel.updateOne({ userId: userId }, { $set: { items: {vehicleId:items}} } ).exec();
    return updateCart;
  }

}


