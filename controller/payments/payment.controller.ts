import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { EOrderStatus } from "../../models/orders/interface";
import { EPaymentMethod, EStatusPayment } from "../../models/payments/interface";
import { getOrderById } from "../../services/order/order.svc";
import { IRequestCreatePayment } from "../../services/payments/interface";
import { createPayment } from "../../services/payments/payments.svc";
import { checkDataFromDb, isDataObject } from "../utils";

const handleCreatePayment = catchAsync(
  async (req: Request<any, any, IRequestCreatePayment['body'], any>, res: Response) => {
    const { addressOrder, orderId, userId } = req.body;

    const order = await getOrderById(orderId);
    if (!isDataObject(order)) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_ORDER
      });
    }
    const checkOrder = await checkDataFromDb(order, EMessage.NOT_FOUND_ORDER, res)
    if (!checkOrder) return res.status(ECode.FAIL).json({
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_ORDER
    });

    if (order.userId !== userId && order.status !== EOrderStatus.NOT_ORDER) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_ORDER
      });
    }

    // const updateAddress = await updateOrderByField(orderId, { addressOrder: addressOrder });
    // const updateStatus = await updateOrderByField(orderId, { status: EOrderStatus.ORDERED });

    // if (updateAddress.code && updateAddress.code === ECode.NOT_FOUND
    //   ||
    //   updateStatus.code && updateStatus.code === ECode.NOT_FOUND
    // ) {
    //   return res.status(ECode.FAIL).json({
    //     code: ECode.FAIL,
    //     message: updateAddress.message
    //   });
    // }

    const payment = await createPayment({
      method: EPaymentMethod.COD,
      orderId,
      status: EStatusPayment.NOT_PAYMENT,
      userId
    });

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

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.CREATE_PAYMENT_SUCCESS,
      data: payment
    })
  }
)

export {
  handleCreatePayment
};

