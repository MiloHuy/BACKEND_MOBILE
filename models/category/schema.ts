import { Schema } from "mongoose";
import { ICategorySchema } from "./interface";

export const categorySchema: Schema<ICategorySchema> = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
})
