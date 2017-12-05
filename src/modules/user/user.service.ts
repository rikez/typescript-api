
import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { IUser } from './persistence/user.interface';
import { User } from './persistence/user';
import { CryptographHelper, ICryptoObject } from '../../helpers/cryptograph.helper';
import * as Moment from 'moment';
import { UserRepository } from './persistence/user.repository';


@Component()
export class UserService {
  constructor(
      @Inject('User') private readonly entityManager: Model<IUser>,
      private readonly userRepository: UserRepository
    ) {}

  async create(user: User): Promise<IUser> {
      let crypto: ICryptoObject = CryptographHelper.sha(user.password, CryptographHelper.salt());
      user.passwordHash = crypto.passwordHash
      user.salt = crypto.salt;
      user.dateOfBirth = Moment(user.dateOfBirth).format('YYYY-MM-DD');

      const userCreated = new this.entityManager(user);
      return await userCreated.save();
  }

  async findAll(): Promise<IUser[]> {
      return await this.userRepository.findAll({"passwordHash": 0, "salt": 0});
  }

  async findById(userId: string): Promise<IUser> {
      return await this.userRepository.findById(userId, {"passwordHash": 0, "salt": 0});
  }

  async findByEmail(email: string): Promise<IUser> {
      return await this.userRepository.findOneBy({email: email});
  }

  async update(user: User): Promise<IUser> {
      let crypto: ICryptoObject = CryptographHelper.sha(user.password, CryptographHelper.salt());
      return await this.entityManager.update({_id: user._id}, {
        passwordHash: crypto.passwordHash,
        salt: crypto.salt
      }).exec()
  }

  async delete(_id: string): Promise<void> {
      return await this.entityManager.remove({_id: _id});
  }

  async count(): Promise<any> {
      const userCount =  await this.userRepository.count();
      return {quantity: userCount, label: "Users Available"};
  }
}
