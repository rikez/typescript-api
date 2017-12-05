import { BaseRepository } from '../../../core/base.repository';
import { IUser } from './user.interface';
import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Component()
export class UserRepository extends BaseRepository<IUser>{

    constructor(
        @Inject('User') private readonly entityManager: Model<IUser>
    ) { super(entityManager); }
}