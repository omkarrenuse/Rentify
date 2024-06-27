import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

  readonly email?: string;

  @MaxLength(10)
  readonly phone_number?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

}
