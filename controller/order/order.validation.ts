import { array, number, object, ObjectSchema, string } from "yup";
import { IRequestAddToCart } from "../../services/order/interface";
import { genMessRequired } from "../utils";

export const addToCartSchema: ObjectSchema<Record<keyof IRequestAddToCart['body'], unknown>> = object().shape({
  userId: string().required(genMessRequired('userId')),
  productId: string().required(genMessRequired('userId')),
  productPrice: number().required(genMessRequired('Giá sản phẩm')),
  productQuanitiOrder: number().required(genMessRequired('Số lượng sản phẩm')).min(0, 'Số lượng sản phẩm phải lớn hơn 0'),
  productSize: array().of(string().required(genMessRequired('Size sản phẩm'))),
})
