import { Schema } from "mongoose";
import { EOrderStatus, IOrderSchema } from "./interface";

export const orderSchema: Schema<IOrderSchema> = new Schema({
  userId: {
    type: String,
    ref: 'users',
    required: true
  },
  productId: {
    type: [String],
    ref: 'products',
    required: true
  },
  productPrice: {
    type: [Number],
    required: true
  },
  productQuanitiOrder: {
    type: [Number],
    required: true
  },
  productSize: {
    type: [String],
    required: true
  },
  addressOrder: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: EOrderStatus,
    default: 'NOT_ORDER'
  },
  confirm: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})
