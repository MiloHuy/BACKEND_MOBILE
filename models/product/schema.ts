import mongoose, { Schema } from "mongoose";
import { IProductSchema } from "./interface";

export const productSchema: Schema<IProductSchema> = new Schema({
  productName: {
    type: String,
  },
  productImg: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands'
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  },
  discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'discounts'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  price: {
    type: [Number],
  },
  size: {
    type: [String],
  },
  quantity: {
    type: Number,
  },
  productRate: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
  },
  isLiked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });