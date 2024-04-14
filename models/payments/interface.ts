import mongoose, { Document } from "mongoose";

export enum EPaymentMethod {
  COD = 'COD',
  OTHER = 'OTHER'
}

export enum EStatusPayment {
  NOT_PAYMENT = 'NOT_PAYMENT',
  PAID = 'PAID'
}

export interface IPaymentSchema extends Document {
  method: string;
  orderId: typeof mongoose.Schema.ObjectId;
  userId: typeof mongoose.Schema.ObjectId;
  status: string;
}
