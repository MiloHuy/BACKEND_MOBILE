import { Schema } from "mongoose";
import { IProductSchema } from "./interface";

export const productSchema: Schema<IProductSchema> = new Schema({
  productName: {
    type: String,
  },
  productImg: {
    type: String,
  },
  category_id: {
    type: String,
    ref: 'categories',
  },
  brand_id: {
    type: String,
    ref: 'brands'
  },
  order_id: {
    type: String,
    ref: 'orders'
  },
  discount_id: {
    type: String,
    ref: 'discounts'
  },
  user_id: {
    type: String,
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