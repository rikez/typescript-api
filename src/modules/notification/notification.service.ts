import { Component, Inject } from '@nestjs/common';
import { INotification } from './persistence/notification.interface'
import { Model } from 'mongoose';
import { NotificationRepository } from './persistence/notification.repository';
import { OneSignalService } from '../common/services/onesignal.service';

@Component()
export class NotificationService{

    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly onesignalService: OneSignalService
    ) {}

    async findAll(): Promise<INotification[]> {
        return await this.notificationRepository.findAll();
    }

    async create() {
        return await Promise.all([
            this.onesignalService.createNotification({
                contents: {"en": "English Message"},
                included_segments: ["All"]
            }),
        ]);
    }
    async count(): Promise<any> {
        const notCount =  await this.notificationRepository.count();
        return {quantity: notCount, label: "Notifications Sent"};
    }
}