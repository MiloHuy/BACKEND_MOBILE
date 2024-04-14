import { EPaymentMethod, EStatusPayment } from "../../models/payments/interface";

export interface ICreatePayment {
  body: {
    method: EPaymentMethod,
    orderId: string,
    userId: string,
    status: EStatusPayment,
  }
}
