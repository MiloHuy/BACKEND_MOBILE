import { Schema } from "mongoose";
import { ICommentSchema } from "./inteface";

export const commentSchema: Schema<ICommentSchema> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  content: {
    type: String,
    required: true
  },
  discoutId: {
    type: Schema.Types.ObjectId,
    ref: 'discounts',
  }
}, {
  timestamps: true
})