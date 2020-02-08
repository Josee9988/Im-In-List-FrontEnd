/**
 * The user interface that will be used with the API calls.
 */
export interface IUser {
    id?: number;
    name: string;
    email: string;
    role: number;
    listasCreadas: Array<number>;
    listasParticipantes: Array<number>;

}
