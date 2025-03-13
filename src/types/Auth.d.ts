import { User, Session } from "next-auth"

interface IRegister {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface IActivation {
    code: string
}

interface ILogin {
    identifier: string;
    password: string;
}
interface UserExtended extends User {
    accessToken?: string;
    role?: string;
}

interface SessionExtended extends Session {
    accessToken?: string;
}

interface JWTExtended extends JWT {
    user?: UserExtended;
}

export type {
    IRegister, IActivation, ILogin, UserExtended, SessionExtended, JWTExtended
}