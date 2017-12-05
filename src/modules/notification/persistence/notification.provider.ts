import { Connection } from 'mongoose';
import { NotificationSchema } from './notification.schema';
import { NotificationRepository } from './notification.repository';

export const notificationProviders = [
  {
    provide: 'NotificationModel',
    useFactory: (connection: Connection) => connection.model('Notification', NotificationSchema),
    inject: ['DbConnectionToken'],
  }
];