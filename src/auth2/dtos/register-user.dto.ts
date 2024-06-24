import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, {message: 'Please Enter correct Email'})
  readonly email: string;

  @IsNotEmpty()
  readonly phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  readonly roleId:string

  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  readonly birthDate: string;

}
