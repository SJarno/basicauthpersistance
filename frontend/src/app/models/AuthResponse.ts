import { Role } from "./Role"

export interface AuthResponse {
    name: string
    authenticated: boolean
    roles: Role[]
}