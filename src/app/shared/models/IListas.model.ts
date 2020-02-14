import { IListElement } from './IListElements.interface';

/**
 * The lista interface that will be used with the API calls.
 */
export interface ILista {
    id?: number;
    idUsuarioCreador?: number;
    titulo: string;
    contraseña?: string;
    descripcion: string;
    elementos: Array<IListElement>;
    updated_at?: Date;
    created_at?: Date;
    url: string;
}
