import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { CorsMiddleware } from './middleware/cors.middleware';
import { CommonModule } from './common/common.module';
import { StatsModule } from './stats/stats.module';

@Module({
  modules: [AuthModule, NotificationModule, UserModule, CommonModule, StatsModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
      consumer.apply(CorsMiddleware).forRoutes(
          { path: '*', method: RequestMethod.ALL }
      );
  }
}


