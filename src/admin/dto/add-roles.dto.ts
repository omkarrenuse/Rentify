import { IsNotEmpty } from "class-validator";

export class AddRolesDto {

    @IsNotEmpty()
    role: string
}

