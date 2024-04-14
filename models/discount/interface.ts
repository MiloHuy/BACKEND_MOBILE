import mongoose, { Document } from "mongoose";

export interface IDiscountSchema extends Document {
  categoryId: typeof mongoose.Schema.ObjectId;
  code: string,
  nameDiscount: string,
  minValue: number,
  maxValue: number,
  condition: boolean
}
