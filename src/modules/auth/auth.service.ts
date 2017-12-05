import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { CryptographHelper, ICryptoObject } from '../../helpers/cryptograph.helper';
import {sign, verify} from 'jsonwebtoken'
import { IUserCredentials, IUser } from '../user/persistence/user.interface'
import { User } from '../user/persistence/user';
const env = require('../../../env.json')['token'];

@Component()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async logIn(userCredentials : IUserCredentials): Promise<boolean| any> {
        const user: IUser = await this.userService.findByEmail(userCredentials.email);
        if(!user) return false;
        const reqPassword = CryptographHelper.sha(userCredentials.password, user.salt);
        if(reqPassword.passwordHash !== user.passwordHash) return false;

        const token: string = await sign({email: user.email, role: user.roles, name: user.name}, env['secret'], {expiresIn: '12h'})

        return {token, name: user.name};
    }

}