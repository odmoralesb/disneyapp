export enum Role {
    ADMINDB = 'ADMIN-DB',
    SU = 'SUPERADMIN',
    USER = 'USER'
}

export interface IUserState {
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    is_superuser: boolean;
    token: string;
}
