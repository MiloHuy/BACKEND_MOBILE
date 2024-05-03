import { Document, model } from "mongoose";
import { IOrderSchema } from "./interface";
import { orderSchema } from "./schema";

export const nameModelOrders = 'orders';
export const ModalOrder = model<IOrderSchema & Document>(nameModelOrders, orderSchema);
