import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { EOrderStatus } from "../../models/orders/interface";
import { updateStatusOrder } from "../../services/order/order.svc";
import { ICreatePayment } from "../../services/payments/interface";
import { createPayment } from "../../services/payments/payments.svc";

const handleCreatePayment = catchAsync(
  async (req: Request<any, ICreatePayment['body'], any>, res: Response) => {
    const payment = await createPayment(req.body);

    if (payment.code && payment.code === ECode.NOT_FOUND) {
      return res.status(payment.code).json({
        message: payment.message
      });
    }

    if (payment.status && payment.status === EApiStatus.Error) {
      return res.status(payment.code).json({
        message: payment.message
      });
    }

    const orders = await updateStatusOrder(req.params.orderId, EOrderStatus.ORDERED);

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(ECode.FAIL).json({
        message: orders.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.PAYMENT_SUCCESS,
      data: payment
    })
  }
)

export {
  handleCreatePayment
};

