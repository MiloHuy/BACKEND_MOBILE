import { Schema } from "mongoose";
import { nameModelOrders } from "../orders/order.model";
import { nameModelUser } from "../user/user.modal";
import { EPaymentMethod, EStatusPayment, IPaymentSchema } from "./interface";

export const paymentSchema: Schema<IPaymentSchema> = new Schema({
  method: {
    type: String,
    enum: EPaymentMethod,
    default: EPaymentMethod.COD
  },
  orderId: {
    type: String,
    ref: nameModelOrders,
  },
  userId: {
    type: String,
    ref: nameModelUser,
  },
  status: {
    type: String,
    enum: EStatusPayment,
    default: EStatusPayment.NOT_PAYMENT
  }
}, {
  timestamps: true
})
