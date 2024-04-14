import { Schema } from "mongoose";
import { IBrandSchema } from "./interface";

export const brandSchema: Schema<IBrandSchema> = new Schema({
  brandName: { type: String, required: true },
  brandImg: { type: String, required: true },
  brandAddress: { type: String, required: true },
  brandRate: { type: Number, required: true },
  description: { type: String, required: true },
})

