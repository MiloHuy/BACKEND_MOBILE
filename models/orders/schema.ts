import mongoose, { Schema } from "mongoose";
import { nameModelBrands } from "../brand/brand.modal";
import { nameModelProduct } from "../product/product.modal";
import { nameModelUser } from "../user/user.modal";
import { EOrderStatus, IOrderSchema } from "./interface";

export const orderSchema: Schema<IOrderSchema> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: nameModelUser,
    required: true
  },
  brandId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: nameModelBrands,
    required: true
  },
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: nameModelProduct,
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
