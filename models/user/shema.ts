import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "./interface";

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export const userSchema: Schema<IUserSchema> = new Schema({
  fullName: {
    type: String,
    required: [true, 'Vui lòng nhập tên.'],
  },
  role_id: {
    type: mongoose.Schema.ObjectId,
    default: null
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    default: null
  },
  brand_id: {
    type: mongoose.Schema.ObjectId,
    default: null
  },
  avatar: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
  },
  phone: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
    minLength: [10, 'Nhập tối thiểu 10 số'],
    maxLength: [10, 'Không được nhập quá 10 số']
  },
  gender: {
    type: String,
    enum: EGender,
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email của bạn.']
  },
  address: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu.']
  },
  accessTokens: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

