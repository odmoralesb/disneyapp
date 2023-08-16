export interface IRole {
    nombre: string;
    descripcion: string;
}

export interface IUserData {
    nombreusuario: string;
    nombres: string;
    apellidos: string;
    rol?: IRole;
    superusuario: boolean;
}

export interface IResponseLogin {
    usuario: IUserData;
    token: unknown;
}

export interface IResponseUser {
    usuario: IUserData;
}


