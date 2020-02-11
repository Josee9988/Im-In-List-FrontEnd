/**
 * The property 'elementos' from the listas interface.
 */
export interface IListElement {
    order: number;
    text: string;
    master: boolean;
    subTasks: Array<number>;
}

/**
 * An array of 'IListElement'
 * @see IListElement
 */
export interface IListElements extends Array<IListElement> { }
