import { Document } from "mongoose";


export interface INotification extends Document {
    name: string;
    description:string;
    message: string;
    playersIncluded: string;
    scheduledDateTime: Date;
    requestObj: string;
    createdAt: Date;
}