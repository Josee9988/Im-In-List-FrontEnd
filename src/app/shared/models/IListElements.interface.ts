/**
 * The property 'elementos' from the listas interface.
 */
interface IListElement {
    order: number;
    text: string;
    master: boolean;
}

export interface IListElements extends Array<IListElement> { }
