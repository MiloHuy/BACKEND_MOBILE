import { Document, model } from "mongoose";
import { ICategorySchema } from "./interface";
import { categorySchema } from "./schema";

export const ModalCategory = model<ICategorySchema & Document>('categories', categorySchema);
