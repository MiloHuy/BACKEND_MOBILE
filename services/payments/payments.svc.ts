import { EApiStatus } from "../../constanst/api.const"
import { ECode, EMessage } from "../../constanst/code-mess.const"
import { EStatusPayment } from "../../models/payments/interface"
import { ModalPayment } from "../../models/payments/payments.model"
import { ICreatePayment, IRequestGetPaymentByField } from "./interface"

const getUserByStatusPayment = async (userId: string, status: EStatusPayment): Promise<any> => {
  if (!userId || !Object.values(EStatusPayment).includes(status)) {
    return {
      status: EApiStatus.Error,
      code: ECode.BAD_REQUEST,
      message: EMessage.BAD_REQUEST
    }
  }

  try {
    return await ModalPayment.find({ userId }).where(status).exec()
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getPaymentByField = async (field: IRequestGetPaymentByField): Promise<any> => {
  try {
    return await ModalPayment.find(field).exec()
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const createPayment = async (payment: ICreatePayment['body']): Promise<any> => {
  try {
    return await ModalPayment.create(payment)
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const updateStatusPayment = async (paymentId: string, status: EStatusPayment): Promise<any> => {
  if (!paymentId || !Object.values(EStatusPayment).includes(status)) {
    return {
      status: EApiStatus.Error,
      code: ECode.BAD_REQUEST,
      message: EMessage.BAD_REQUEST
    }
  }

  try {
    return await ModalPayment.findByIdAndUpdate(paymentId, { $set: { status: status } }, { new: true })
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

export {
  createPayment, getPaymentByField, getUserByStatusPayment, updateStatusPayment
}

