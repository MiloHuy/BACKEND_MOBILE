import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ModalDiscount } from "../../models/discount/discount.model";
import { ICreateDiscount } from "./interface";

const createDiscount = async (discount: ICreateDiscount): Promise<any> => {
  try {
    const newDiscount = await ModalDiscount.create(discount);
    return newDiscount;
  } catch (error) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

export { createDiscount };
