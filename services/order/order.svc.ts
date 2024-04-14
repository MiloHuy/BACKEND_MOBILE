import { EApiStatus } from "../../constanst/api.const";
import { EPagingDefaults } from "../../constanst/app.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { EOrderStatus } from "../../models/orders/interface";
import { ModalOrder } from "../../models/orders/order.model";
import { IRequestAddToCart } from "./interface";

const getAllOrders = async (
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize): Promise<any> => {

  try {
    const skip = (page - 1) * limit;
    const orders = await ModalOrder.find({})
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']])
      .skip(skip)
      .limit(limit);
    return orders;
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getAllOrderByUserId = async (
  userId: string,
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize):
  Promise<any> => {

  if (!userId) return {
    code: ECode.NOT_FOUND,
    message: EMessage.NOT_FIND_USER
  }

  try {
    const skip = (page - 1) * limit;
    const orders = await ModalOrder.find({ userId: userId })
      .skip(skip)
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']])
      .limit(limit);

    return orders;
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getAllOrderByStatus = async (
  status: EOrderStatus,
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize,
  userId: string
): Promise<any> => {

  if (!status) return {
    code: ECode.NOT_FOUND,
    message: EMessage.NOT_FOUND_PRODUCT
  }

  if (!Object.values(EOrderStatus).includes(status)) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    const skip = (page - 1) * limit;
    const orders = await ModalOrder.find({ status: status, userId: userId })
      .skip(skip)
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']])
      .limit(limit);

    return orders;
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const createOrder = async (order: IRequestAddToCart['body']): Promise<any> => {
  if (!order) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    return ModalOrder.create(order)
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const confirmOrder = async (orderId: string, confirm: boolean): Promise<any> => {
  if (!orderId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    return ModalOrder.findByIdAndUpdate(orderId, { $set: { confirm: confirm } }, { new: true })
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const updateStatusOrder = async (orderId: string, status: EOrderStatus): Promise<any> => {
  if (!orderId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  if (!Object.values(EOrderStatus).includes(status)) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    return ModalOrder.findByIdAndUpdate(orderId, { $set: { status: status } }, { new: true })
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const removeProductOrder = async (orderId: string, productId: string): Promise<any> => {
  if (!orderId || !productId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }
  try {
    return ModalOrder.findByIdAndUpdate(orderId, { $pull: { products: { _id: productId } } }, { new: true })
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
  confirmOrder,
  createOrder,
  getAllOrderByStatus,
  getAllOrderByUserId,
  getAllOrders,
  removeProductOrder,
  updateStatusOrder
};

