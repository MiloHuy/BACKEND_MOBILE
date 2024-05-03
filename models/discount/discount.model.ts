import { Document, model } from "mongoose";
import { IDiscountSchema } from "./interface";
import { discountSchema } from "./schema";

export const nameModelDiscount = 'discounts';
export const ModalDiscount = model<IDiscountSchema & Document>(nameModelDiscount, discountSchema);
