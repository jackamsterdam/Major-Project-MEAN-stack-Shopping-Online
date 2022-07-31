import jwtDecode from "jwt-decode"
import { UserModel } from "../models/user.model"

export class AuthState {
    user: UserModel = null
    token: string = null

    constructor() {
        this.token = localStorage.getItem('token')
        if (this.token) {
            const encodedObject: any = jwtDecode(this.token)
            this.user = encodedObject.user
        }
    }
}
//Action type
export enum AuthActionType {
    Register = 'Register',
    Login = 'Login',
    Logout = 'Logout'
}
//Action you send with dispatch 
export interface AuthAction {
    type: AuthActionType,
    payload?: string
}

//Action Creators 
export function registerAuthAction(token: string): AuthAction {
    return { type: AuthActionType.Register, payload: token }
}
export function loginAuthAction(token: string): AuthAction {
    return { type: AuthActionType.Login, payload: token }
}

export function logoutAuthAction(): AuthAction {
    return { type: AuthActionType.Logout }
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState }
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload
            const encodedObject: any = jwtDecode(newState.token)
            newState.user = encodedObject.user
            localStorage.setItem('token', newState.token)
            break;
        case AuthActionType.Logout:
            newState.token = null
            newState.user = null
            localStorage.removeItem('token')
            break
    }

    return newState
}