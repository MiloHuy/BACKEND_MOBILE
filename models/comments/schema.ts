import { Schema } from "mongoose";
import { nameModelDiscount } from "../discount/discount.model";
import { nameModelProduct } from "../product/product.modal";
import { nameModelUser } from "../user/user.modal";
import { ICommentSchema } from "./inteface";

export const commentSchema: Schema<ICommentSchema> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: nameModelUser,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: nameModelProduct,
  },
  rateComment: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  discoutId: {
    type: Schema.Types.ObjectId,
    ref: nameModelDiscount,
  }
}, {
  timestamps: true
})
