export interface IToken {
    id?: number;
    username: string;
    role: string;
    exp: number;
    iat: number;
}

export interface IUser {
    id?: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    is_superuser: boolean;
    role_id: number;
    role: IRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRole {
    id?: number;
    name: string;
    description: string;
}

export interface IResponse {
    status: number;
    payload?: Object;
    messages?: string[];
    errors?: string[] | unknown[];
}

export interface IFile {
    id?: number;
    path: string;
}

export interface ICharacter {
    id?: number;
    name: string;
    weight: number;
    age: number;
    story: string;
    image: number | Object;
    file?: IFile;
}
