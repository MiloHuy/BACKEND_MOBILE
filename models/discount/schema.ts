import { Schema } from "mongoose";
import { IDiscountSchema } from "./interface";

export const discountSchema: Schema<IDiscountSchema> = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  nameDiscount: {
    type: String,
    required: true
  },
  minValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  },
  condition: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})