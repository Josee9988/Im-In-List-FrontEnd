import { IListElements } from './IListElements.interface';

export interface ILista {
    id?: number;
    idUsuarioCreador: number;
    titulo: string;
    descripcion: string;
    elementos: IListElements;
}
