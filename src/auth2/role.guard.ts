import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Roles } from "src/models/roles.model";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private jwtService: JwtService,@InjectModel('Roles') private readonly rolesModel:Model<Roles>, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()

        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            let decodedRoleIdFromToken;
            const token = request.headers.authorization.split(' ')[1];
            const decoded = this.jwtService.decode(token) as { roleId: string } | null;
            const roles = this.reflector.get<string[]>('roles', context.getHandler());

            if (decoded) {
                decodedRoleIdFromToken = decoded.roleId
                if (roles) {
                    for (const role of roles) {
                        const roleDetails = await this.rolesModel.findOne({role:role})
                        if (Types.ObjectId.createFromHexString(decodedRoleIdFromToken).equals(roleDetails._id)) {
                            return true; // Grant access
                        }
                    }

                }
            }
        }

        return false;
    }


}
