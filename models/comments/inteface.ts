import mongoose, { Document } from "mongoose";

export interface ICommentSchema extends Document {
  userId: typeof mongoose.Schema.ObjectId;
  content: string;
  discoutId: typeof mongoose.Schema.ObjectId;
}
