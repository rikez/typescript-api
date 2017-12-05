import { Controller, Get, Post, Body, Param, HttpStatus, HttpException, Put, Delete, Req, HttpCode} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';

@Controller('stats')
export class StatsController {

  constructor(
      private readonly userService: UserService,
      private readonly notificationService: NotificationService
    ) {}

  @Get()
  async getStats() {
      try {
          const result = await Promise.all([
              this.userService.count(),
              this.notificationService.count()
          ])

          result.push({quantity: "3", label: "Courses Made"})
          return result;
      } catch(e) {
        throw new HttpException(e.message,
          HttpStatus.BAD_REQUEST
        );
      }
  }

}