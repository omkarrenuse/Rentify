import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {

  @IsEmail({}, {message: 'Please Enter correct Email'})
  readonly email?: string;

  readonly phone_number?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

}
