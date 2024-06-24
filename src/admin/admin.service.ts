import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from 'src/models/roles.model';
import { User } from 'src/models/user.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private readonly adminModel: Model<User>,
    @InjectModel('Roles') private readonly RolesModel: Model<Roles>,
  ) { }

  async addRoles(rolesData) {
    const { role } = rolesData;
    const addRole = await this.RolesModel.create({
      role: role
    })
    return addRole
  }

}
