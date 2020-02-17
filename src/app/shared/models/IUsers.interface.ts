/**
 * The user interface that will be used with the API calls.
 */
export interface IUser {
    id?: number;
    name: string;
    email: string;
    role: number;
    oldPassword?: string;
    password?: string;
    listasCreadas: Array<number>;
    listasParticipantes: Array<number>;
    updated_at: Date;
    created_at: Date;
}
