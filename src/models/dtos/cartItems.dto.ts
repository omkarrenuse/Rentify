import { IsNotEmpty } from "class-validator";

export class CreateCartItemDto {
    @IsNotEmpty()
    vehicleId: string;

  }