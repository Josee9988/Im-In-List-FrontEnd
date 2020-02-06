import { IListElements } from './IListElements.interface';

export interface ILista {
    id?: number;
    idUsuarioCreador: number;
    titulo: string;
    contraseña?: string;
    descripcion: string;
    elementos: IListElements;
}
