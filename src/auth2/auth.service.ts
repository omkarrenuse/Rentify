import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema, User } from '../models/user.model'
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(RegisterUserDto: RegisterUserDto): Promise<{ token: string }> {
        const { name, phone_number, email, password, roleId, gender, birthDate } = RegisterUserDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            phone_number,
            email,
            password: hashedPassword,
            roleId,
            gender,
            birthDate: new Date(birthDate)
        })

        const token = this.jwtService.sign({ id: user._id, role: user.roleId })
        return { token }
    }

    async login(loginDto:LoginUserDto):Promise<{token: string}>{
        const {email,phone_number, password} = loginDto;
        const user = await this.userModel.findOne({
            $or: [
              { email: email },
              { phone_number: phone_number }
            ]
          });
        if (!user){
            throw new UnauthorizedException("Invalid email or phone_number")
        }else{
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch){
                throw new UnauthorizedException("Invalid Password")
            }
        }
        const token = this.jwtService.sign({ id: user._id, role: user.roleId })
        return { token }
    }

}