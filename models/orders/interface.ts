import mongoose, { Document } from "mongoose";

export enum EOrderStatus {
  NOT_ORDER = 'NOT_ORDER',
  ORDERED = 'ORDERED',
  PREPARING = 'PREPARING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  ABORTED = 'ABORTED'
}

export interface IOrderSchema extends Document {
  userId: typeof mongoose.Types.ObjectId;
  productId: typeof mongoose.Schema.ObjectId[];
  brandId: typeof mongoose.Schema.ObjectId[];
  productPrice: number[];
  productQuanitiOrder: number[];
  productSize: string[];
  addressOrder: string;
  status: string;
  confirm: boolean;
}
