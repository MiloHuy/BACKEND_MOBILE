import { Document } from "mongoose";

export enum ECategoriesName {
  CAFE = "CAFE",
  TEA = "TEA",
  JUICE = "JUICE",
}

export interface ICategorySchema extends Document {
  categoryName: string;
}
