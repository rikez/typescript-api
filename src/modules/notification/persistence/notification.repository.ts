import { BaseRepository } from '../../../core/base.repository';
import { INotification } from './notification.interface';
import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Component()
export class NotificationRepository extends BaseRepository<INotification>{

    constructor(
        @Inject('NotificationModel') private readonly entityManager: Model<INotification>
    ) { super(entityManager); }
}