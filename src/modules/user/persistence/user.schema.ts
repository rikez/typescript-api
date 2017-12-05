import * as mongoose from 'mongoose';
import { UserRoles } from '../utils/user.role.enum'; 
import { CryptographHelper } from '../../../helpers/cryptograph.helper';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Property name is required"],
    minlength: 2,
    maxlength: 60
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Property birth date is required"],
  },
  email: {
    type: String,
    unique: [true, 'Email is unique'],
    required: [true, 'Property email is required'],
    maxlength: 100
  },
  passwordHash: {
      type: String,
      required: [true, "Property password is required"],
  },
  salt : {
    type: String,
    required: [true, "Property salt is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  roles: {
      type: [Number],
      default: [UserRoles.ADMIN]
  }
});

