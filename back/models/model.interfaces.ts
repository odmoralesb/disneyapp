export interface IToken {
    id?: number;
    nombreusuario: string;
    rol: string;
    exp: number;
    iat: number;
}

export interface IUser {
    id?: number;
    nombreusuario: string;
    clave: string;
    nombres: string;
    apellidos: string;
    email: string;
    superusuario: boolean;
    rol_id?: number;
    role?: IRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRole {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface IResponse {
    status: number;
    payload?: Object;
    messages?: string[];
    errors?: string[] | unknown[];
}