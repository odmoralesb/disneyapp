export interface IRequestCreateAdmin {
    nombreusuario: string;
    nombres: string;
    apellidos: string;
    clave: string;
}

export interface IRequestUpdateAdmin {
    nombreusuario?: string;
    nombres?: string;
    apellidos?: string;
}