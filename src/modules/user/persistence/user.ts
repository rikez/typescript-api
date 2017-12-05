
export class User {
    readonly name: string;
    dateOfBirth: string;
    readonly email: string;
    readonly password: string;
    salt: string;
    passwordHash: string;
    _id: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly roles?: Number[];
}