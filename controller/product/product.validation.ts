import { array, number, object, ObjectSchema, string } from "yup";
import { IRequestCreateProduct } from "../../services/product/interface";
import { genMessRequired } from "../utils";

const productIdSchema = object().shape({
  productId: string()
    .required(genMessRequired('productId'))
});

const productSchema: ObjectSchema<Record<keyof IRequestCreateProduct['query'], unknown>> = object().shape({
  productName: string().required(genMessRequired('name')),
  productImg: string(),
  price: number().required(genMessRequired('price')).min(0, 'Giá tiền tối thiểu của 1 sản phẩm phải lớn hơn 0'),
  size: array().of(string().required(genMessRequired('size'))),
  rate: number().required(genMessRequired('rate')).min(0, 'Rate tối thiểu của 1 sản phẩm là 0').max(5, 'Rate tối đa của 1 sản phẩm là 5'),
  description: string(),
  category: string(),
  brand: string(),
  quantity: number()
})

export { productIdSchema, productSchema };

