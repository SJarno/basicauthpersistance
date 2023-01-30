import { Role } from "./Role"

export interface AuthResponse {
    /* name: string */
    username: string
    authenticated: boolean
    roles: Role[]
}