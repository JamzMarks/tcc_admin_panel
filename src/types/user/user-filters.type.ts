import { Roles } from "./roles.type";

export type UserFilter = {
    query: string | null,
    role: Roles | null,
    status: boolean | null
}