export interface User {
    id: number;
    name: string;
    email: string;
    role: number;
    listasCreadas: Array<number>;
    listasParticipantes: Array<number>;

}
