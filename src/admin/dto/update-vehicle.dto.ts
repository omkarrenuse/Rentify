import { IsNotEmpty } from "class-validator";

export class UpdateVehicleDto{
    @IsNotEmpty()
    id: string;

    carLicenseNumber:string

    manufacturer:string

    carModel:string

    vehicleType:string

    vehicleCapacity:string

    basePrice:number

    PPH:number

    securityDeposit:number
}