import mongoose, { Document } from "mongoose";

export interface ICommentSchema extends Document {
  userId: typeof mongoose.Schema.ObjectId;
  productId: typeof mongoose.Schema.ObjectId;
  content: string;
  rateComment: number;
  discoutId: typeof mongoose.Schema.ObjectId;
}
