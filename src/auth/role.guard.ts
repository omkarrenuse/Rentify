import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { Reflector } from "@nestjs/core";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private jwtService: JwtService, private prisma: PrismaService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()

        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            let decodedRoleFromToken;
            const token = request.headers.authorization.split(' ')[1];
            const decoded = this.jwtService.decode(token) as { role: string } | null;
            const roles = this.reflector.get<string[]>('roles', context.getHandler());

            if (decoded) {
                decodedRoleFromToken = decoded.role
                if (roles) {
                    for (const role of roles) {
                        if (decodedRoleFromToken === role) {
                            return true; // Grant access
                        }
                    }

                }
            }
        }

        return false;
    }


}
