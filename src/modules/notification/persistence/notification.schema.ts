import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Property name is required"],
    minlength: 2,
    maxlength: 60
  },
  description: {
    type: String,
    required: [true, "Property description is required"],
  },
  message: {
    type: String,
    required: [true, 'Property message is required'],
  },
  playersIncluded: {
      type: [String],
      required: [true, "Property playersIncluded is required"],
  },
  scheduledDateTime: {
      type: Date,
      required: [true, "Property schedule is required"],
  },
  requestObj: {
    type: String,
    required: [true, "Property requestObj is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

