import { Rol } from "./rol.interface";

export interface Usuario {
    cveUsuario?: number;
    nombre: string;
    apellidos: string;
    username?: string;
    password?: string;
    //fechaRegistro: Date;
    rol: Rol[];
    //rol?: Number;
}