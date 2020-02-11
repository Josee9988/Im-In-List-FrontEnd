/**
 * The ILoginUser interface that will be used for the user login in the database.
 */
export interface ILoginUser {
    email: string;
    password: string;
}

/**
 * The IRegisterUser interface that will be used for registering in the database.
 */
export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
}
