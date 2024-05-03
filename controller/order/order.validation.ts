import { array, number, object, ObjectSchema, string } from "yup";
import { IRequestAddToCart } from "../../services/order/interface";
import { IRequestStatusOrdered } from "../../services/payments/interface";
import { genMessRequired } from "../utils";

export const addToCartSchema: ObjectSchema<Record<keyof IRequestAddToCart['body'], unknown>> = object().shape({
  userId: string().required(genMessRequired('userId')),
  productId: string().required(genMessRequired('Sản phẩm')),
  productPrice: number().required(genMessRequired('Giá sản phẩm')),
  productQuanitiOrder: number().required(genMessRequired('Số lượng sản phẩm')).min(0, 'Số lượng sản phẩm phải lớn hơn 0'),
  productSize: array().of(string().required(genMessRequired('Size sản phẩm'))),
})

export const statusOrderedSchema: ObjectSchema<Record<keyof IRequestStatusOrdered['body'], unknown>> = object().shape({
  orderId: string().required(genMessRequired('orderId')),
  status: string(),
  addressOrder: string().required(genMessRequired('Địa chỉ giao hàng')),
})
