import { Document, model } from "mongoose";
import { IProductSchema } from "./interface";
import { productSchema } from "./schema";

export const ModalProduct = model<IProductSchema & Document>('products', productSchema);
