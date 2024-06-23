import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema, User } from '../models/user.model'
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dtos/register-user.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(RegisterUserDto: RegisterUserDto): Promise<{ token: string }> {
        const { name, email, password } = RegisterUserDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id, role: user.roleId })
        return { token }
    }

}