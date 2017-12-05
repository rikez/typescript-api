import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    dateOfBirth: string;
    email: string;
    passwordHash: string;
    salt: string;
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    roles?: Number[];
}


export interface IUserCredentials {
    email: string;
    password: string;
}