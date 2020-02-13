import { ISubTaks } from './ISubtaks.interface';

/**
 * The property 'elementos' from the listas interface.
 */
export interface IListElement {
    order: number;
    text: string;
    master: boolean;
    subTasks: Array<ISubTaks>;
}
