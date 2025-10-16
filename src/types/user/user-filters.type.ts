import { Roles } from "./roles.type";

export type UserFilter = {
    query: string | null,
    role: Roles | null,
    isActive: boolean | null
}