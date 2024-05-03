import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { EOrderStatus } from "../../models/orders/interface";
import { EStatusPayment } from "../../models/payments/interface";
import { createComment } from "../../services/comments/comments.svc";
import { IRequestCreateComment } from "../../services/comments/interface";
import { getOrderByUserIdAndStatus } from "../../services/order/order.svc";
import { getPaymentByField } from "../../services/payments/payments.svc";
import { checkDataFromDb, isDataObject } from "../utils";

const handleCreateComments = catchAsync(
  async (req: Request<any, any, IRequestCreateComment['body'], any>, res: Response) => {
    const { userId, productId, content, discountId, rateComment } = req.body;

    const order = await getOrderByUserIdAndStatus(userId, EOrderStatus.DELIVERED);
    if (!isDataObject(order)) {
      return res.status(ECode.FAIL).json({
        status: ECode.FAIL,
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_PRODUCT
      });
    }

    const checkOrder = await checkDataFromDb(order, EMessage.NOT_FOUND_PRODUCT, res)
    if (!checkOrder) return res.status(ECode.FAIL).json({
      status: ECode.FAIL,
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    });

    const paymentByOrderId = await getPaymentByField({ orderId: order.orderId as string, status: EStatusPayment.PAID });
    if (!isDataObject(paymentByOrderId)) {
      return res.status(ECode.FAIL).json({
        status: ECode.FAIL,
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_PRODUCT
      });
    }

    const checkPayment = await checkDataFromDb(paymentByOrderId, EMessage.NOT_FOUND_PRODUCT, res)
    if (!checkPayment) return res.status(ECode.FAIL).json({
      status: ECode.FAIL,
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    });

    const comment = await createComment({
      content,
      productId,
      userId,
      discountId,
      rateComment
    });

    if (!isDataObject(comment)) {
      return res.status(ECode.FAIL).json({
        status: EApiStatus.Error,
        code: ECode.MONGO_SERVER_ERROR,
        message: EMessage.MONGO_SERVER_ERROR
      })
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Create comment successfully',
      data: comment
    });
  });

export { handleCreateComments };

