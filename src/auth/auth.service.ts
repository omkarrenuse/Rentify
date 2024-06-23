import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}


   async generateAccessToken( id: number, username: string, email: string,role : string)  {
    
    const payload = { sub: id, username, email , role };
 
    
  
    return  this.jwtService.signAsync(payload)

  }
  
}




