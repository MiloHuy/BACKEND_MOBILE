import { Document, model } from "mongoose";
import { IPaymentSchema } from "./interface";
import { paymentSchema } from "./schema";

export const ModalPayment = model<IPaymentSchema & Document>('payments', paymentSchema);
