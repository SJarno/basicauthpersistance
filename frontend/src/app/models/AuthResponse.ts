import { Role } from "./Role"

export interface AuthResponse {
    username: string
    authenticated: boolean
    roles: Role[]
}