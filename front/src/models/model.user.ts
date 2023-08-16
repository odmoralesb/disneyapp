export enum Role {
    ADMINDB = 'ADMIN-DB',
    SU = 'SUPERADMIN',
    ADMIN = 'ADMIN'
}

export interface IUserState {
    nombreusuario: string;
    nombres: string;
    apellidos: string;
    rol: string;
    superusuario: boolean;
    token: string;
}
