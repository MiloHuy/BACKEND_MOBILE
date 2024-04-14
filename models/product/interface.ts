import mongoose, { Document } from "mongoose";

export interface IProductSchema extends Document {
  productName: string;
  productImg: string;

  category_id: typeof mongoose.Schema.ObjectId;
  brand_id: typeof mongoose.Schema.ObjectId;
  user_id: typeof mongoose.Schema.ObjectId;
  order_id: typeof mongoose.Schema.ObjectId;
  discount_id: typeof mongoose.Schema.ObjectId;

  price: number[];
  size: string[];
  quantity: number;
  productRate: number;
  description: string;
  isLiked: boolean;
}
