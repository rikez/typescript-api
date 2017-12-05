import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './persistence/user.provider';
import { ValidateBodyMiddleware } from '../middleware/validation.middleware';
import { UserValidation } from './utils/user.validation';
import { DatabaseModule } from '../database/database.module';
import { NestModule } from '@nestjs/common/interfaces';
import { PermissionMiddleware } from '../middleware/permission.middleware';
import { UserRepository } from './persistence/user.repository';

@Module({
  modules: [DatabaseModule],
  controllers: [UserController],
  components: [
    UserService,
    ...userProviders,
    UserRepository
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  
  configure(consumer: MiddlewaresConsumer) : void {
    consumer.apply(ValidateBodyMiddleware)
            .with(new UserValidation())
            .forRoutes(
              {path: '/users', method: RequestMethod.POST},
              {path: '/users', method: RequestMethod.PUT}
            )  
  }
  
}