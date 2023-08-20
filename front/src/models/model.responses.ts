export interface IRole {
    name: string;
    description: string;
}

export interface IUserData {
    username: string;
    firstname: string;
    lastname: string;
    role?: IRole;
    is_superuser: boolean;
}

export interface IResponseLogin {
    user: IUserData;
    token: unknown;
}

export interface IResponseUser {
    username: IUserData;
}

export interface IImagenData {
    id: number;
    path: string;
}

export interface IPersonajeData {
    id: number;
    name: string;
    age: number;
    weight: string;
    image: IImagenData;
    story: string;
}

export interface IResponsePersonajes {
    records: IPersonajeData[];
}
