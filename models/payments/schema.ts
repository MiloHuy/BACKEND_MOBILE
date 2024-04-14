import { Schema } from "mongoose";
import { EPaymentMethod, EStatusPayment, IPaymentSchema } from "./interface";

export const paymentSchema: Schema<IPaymentSchema> = new Schema({
  method: {
    type: String,
    enum: EPaymentMethod
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'orders',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  status: {
    type: String,
    enum: EStatusPayment,
    default: 'NOT_PAYMENT'
  }
}, {
  timestamps: true
})
