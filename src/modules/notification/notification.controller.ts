import { Get, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { INotification } from './persistence/notification.interface';

@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}
    
	@Get()
	async findAll(): Promise<INotification[]> {
    return await this.notificationService.findAll();
  }

  @Post()
	async create(){
    return await this.notificationService.create();
  }
}
