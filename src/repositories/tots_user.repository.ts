import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { instanceToPlain } from 'class-transformer';
import { TotsUser } from '../models/tots_user.model';
import { TotsUserDto } from '../dtos/tots_user.dto';

@Injectable()
export class TotsUserRepository {
    constructor(
        @InjectModel(TotsUser) private userModel: typeof TotsUser,
    ) {}

    create(data: TotsUserDto): Promise<TotsUser> {
        return TotsUser.create(instanceToPlain(data));
    }

    async update(id: number, data: TotsUserDto): Promise<TotsUser> {
        data.id = undefined;
        let item = await this.findById(id);
        item.set(data);
        return item.save();
    }

    async findActiveByEmailOrFail(email: string): Promise<TotsUser> {
        let user = await this.findByEmail(email);
        if(user === null) {
            throw new Error('This account does not exist');
        }
        // Verify is active
        if(user.status != TotsUser.STATUS_ACTIVE){
            throw new Error('This account is not active');
        }

        return user;
    }

    findById(id: number): Promise<TotsUser> {
        return this.userModel.findOne({ where: { id } });
    }

    findByEmail(email: string): Promise<TotsUser> {
        return this.userModel.findOne({ where: { email: email } });
    }

    async findByIdOrFail(id: number): Promise<TotsUser> {
        let item = await this.findById(id);
        if(item === null) {
            throw new Error('Item not found');
        }
        return item;
    }

    async removeById(id: number): Promise<void> {
        let item = await this.findByIdOrFail(id);
        return item.destroy();
    }

    remove(item: TotsUser): Promise<void> {
        return item.destroy();
    }

    getModel() {
        return this.userModel;
    }
}