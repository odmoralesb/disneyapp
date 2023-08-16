import { IUserData } from '../models';
import {
    IResponseLogin,
    IResponseUser,
} from '../models/model.responses';

export const setState = (usuario: IUserData, token: string) => ({
    nombreusuario: usuario.nombreusuario,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    superusuario: usuario.superusuario,
    rol: usuario.rol ? usuario.rol.nombre : '',
    token
});

export const setPayloadLogin = (data: IResponseLogin) => ({
    usuario: data.usuario,
    token: data.token
});

export const setPayloadUser = (data: IResponseUser) => ({
    user: {
        username: data.usuario.nombreusuario,
        firstname: data.usuario.nombres,
        lastname: data.usuario.apellidos,
        is_superuser: data.usuario.superusuario
    }
});



