import { TotsUser } from "../models/tots_user.model";

export class TotsUserDto {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    photo?: string;
    phone?: string;
    role?: number;
    status?: number;
    is_notification?: number;
    caption?: string;
    timezone?: string;
    created_at: Date;
    updated_at: Date;

    static fromModel(model: TotsUser): TotsUserDto {
        return {
            id: model.id,
            firstname: model.firstname,
            lastname: model.lastname,
            email: model.email,
            photo: model.photo,
            phone: model.phone,
            role: model.role,
            status: model.status,
            is_notification: model.is_notification,
            caption: model.caption,
            timezone: model.timezone,
            created_at: model.created_at,
            updated_at: model.updated_at
        };
    }
}