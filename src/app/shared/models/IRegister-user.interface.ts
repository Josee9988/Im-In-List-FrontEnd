/**
 * The IRegisterUser interface that will be used for registering in the database.
 */
export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    captcha: string;
}
