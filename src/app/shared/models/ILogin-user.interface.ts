/**
 * The lista interface that will be used for the user login in the database.
 */
export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}
