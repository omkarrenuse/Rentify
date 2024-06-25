import { IsNotEmpty } from "class-validator"

export class AddVehicleDto{
    @IsNotEmpty()
    carLicenseNumber:string

    @IsNotEmpty()
    manufacturer:string

    @IsNotEmpty()
    carModel:string

    @IsNotEmpty()
    vehicleType:string

    @IsNotEmpty()
    vehicleCapacity:string

    @IsNotEmpty()
    basePrice:number

    @IsNotEmpty()
    PPH:number

    @IsNotEmpty()
    securityDeposit:number
}