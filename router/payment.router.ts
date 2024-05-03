import express from "express";
import { handleCreatePayment } from "../controller/payments/payment.controller";

const routerPayment = express.Router();

const ROUTER_PAYMENT_API = {
  POST: {
    payment: '/api/payment/payment',
  },
}

routerPayment.post(
  ROUTER_PAYMENT_API.POST.payment,
  // validateRequestMiddleware('body', statusOrderedSchema),
  handleCreatePayment
);

export default routerPayment