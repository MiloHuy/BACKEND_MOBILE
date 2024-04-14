import { Document, model } from "mongoose";
import { IOrderSchema } from "./interface";
import { orderSchema } from "./schema";

export const ModalOrder = model<IOrderSchema & Document>('orders', orderSchema);
