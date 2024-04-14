import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { createDiscount } from "../../services/discounts/discounts.svc";
import { ICreateDiscount } from "../../services/discounts/interface";

const handleCreateDiscount = catchAsync(
  async (req: Request<any, ICreateDiscount, any>, res: Response) => {
    const discount = await createDiscount(req.body);

    if (discount.code && discount.code === ECode.NOT_FOUND) {
      return res.status(discount.code).json({
        message: discount.message
      });
    }

    if (discount.status && discount.status === EApiStatus.Error) {
      return res.status(discount.code).json({
        message: discount.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.CREATE_DISCOUNT_SUCCESS,
      data: discount
    })
  }
)

export { handleCreateDiscount };
