import { Roles } from "./roles.type";

export type User = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  avatar?: string;
  isActive: boolean;
};


export type UserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};


export type CreateUserDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  avatar?: string;
}


export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  role?: Roles;
  avatar?: string;
}

