import { IsString, IsArray, ValidateNested, IsNotEmpty } from "class-validator";

export class CartItemDto {
    @IsString()
    vehicleId: string;
  
  }
  
  export class UpdateCartDto {  
    @IsNotEmpty()
    @IsArray()
    items: CartItemDto[];
  }