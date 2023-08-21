import { IUserData } from '../models';
import { IResponseLogin, IResponseUser } from '../models/model.responses';

export const setState = (username: IUserData, token: string) => ({
    username: username.username,
    firstname: username.firstname,
    lastname: username.lastname,
    is_superuser: username.is_superuser,
    role: username.role ? username.role.name : '',
    token
});

export const setPayloadLogin = (data: IResponseLogin) => ({
    username: data.user,
    token: data.token
});

export const setPayloadUser = (data: IResponseUser) => ({
    user: {
        username: data.username.username,
        firstname: data.username.firstname,
        lastname: data.username.lastname,
        is_superuser: data.username.is_superuser
    }
});
