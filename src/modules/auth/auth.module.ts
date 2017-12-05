import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PermissionMiddleware } from '../middleware/permission.middleware';
import { NestModule } from '@nestjs/common/interfaces';
import { UserController } from '../user/user.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { ValidateBodyMiddleware } from '../middleware/validation.middleware';
import { UserValidation } from '../user/utils/user.validation';
import { NotificationController } from '../notification/notification.controller';


@Module({
  modules: [UserModule],
  controllers: [AuthController],
  components: [AuthService]
})
export class AuthModule implements NestModule {
  
  configure(consumer: MiddlewaresConsumer) : void {
    consumer
      //.apply(PermissionMiddleware)
      //.forRoutes(UserController)
      .apply(ValidateBodyMiddleware)
      .with(new UserValidation().credentialsValidation)
      .forRoutes(AuthController);
  }
}