import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';
import { StatsController } from './stats.controller';

@Module({
  modules: [NotificationModule, UserModule],
  controllers: [StatsController],
  components: [],
})
export class StatsModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    return;
  }
}


