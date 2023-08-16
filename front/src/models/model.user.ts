export enum Role {
    ADMINDB = 'ADMIN-DB',
    SU = 'SUPERADMIN',
    USER = 'USER'
}

export interface IUserState {
    nombreusuario: string;
    nombres: string;
    apellidos: string;
    rol: string;
    superusuario: boolean;
    token: string;
}
