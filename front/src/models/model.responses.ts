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

export interface IImagenData {
    id: number;
    ruta: string;
}

export interface IPersonajeData {
    id: number;
    nombre: string;
    edad: number;
    peso: string;
    imagen: IImagenData;
    historia: string;
}

export interface IResponsePersonajes {
    records: IPersonajeData[];
}
