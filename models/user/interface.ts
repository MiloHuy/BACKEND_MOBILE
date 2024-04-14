import mongoose, { Document } from "mongoose";

export type TGender = 'MALE' | 'FEMALE' | "OTHER"

export interface IUserSchema extends Document {
  fullName: string;

  role_id: typeof mongoose.Schema.ObjectId;
  product_id: typeof mongoose.Schema.ObjectId;
  brand_id: typeof mongoose.Schema.ObjectId;
  discount_id: typeof mongoose.Schema.ObjectId;

  avatar: string,
  phone: string,
  accessTokens: string,
  gender: TGender,
  email: string,
  address: string
  password: string
  is_active: boolean
}
