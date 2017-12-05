import {ValidateBodyMiddleware} from '../middleware/validation.middleware';
import { Module, RequestMethod, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '../database/database.module';
import { notificationProviders } from './persistence/notification.provider';
import { NotificationRepository } from './persistence/notification.repository';
import { CommonModule } from '../common/common.module';

@Module({
  modules: [DatabaseModule, CommonModule],
  controllers: [NotificationController],
  components: [NotificationService, ...notificationProviders, NotificationRepository],
  exports: [NotificationService]
})
export class NotificationModule implements NestModule {

  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
      return;
  }
  
}


