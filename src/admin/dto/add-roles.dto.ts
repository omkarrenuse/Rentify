import { IsNotEmpty } from "class-validator";

export class AddRolesDto {

    @IsNotEmpty()
    role: string
}


// .ENV

// DB_URI = mongodb://localhost:27017/CarRentalApp

// PORT = 5000
// JWT_SECRET = codingwithomkar
// JWT_EXPIRES = 3d