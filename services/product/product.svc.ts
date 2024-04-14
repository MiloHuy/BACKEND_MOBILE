import { EApiStatus } from "../../constanst/api.const";
import { EPagingDefaults, ESort } from "../../constanst/app.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ModalProduct } from "../../models/product/product.modal";
import { getCategoryByName } from "../category/category.svc";

export type Sort = {
  [key: string]: ESort.ASC | ESort.DESC;
};

const buildQuery = (productName?: string, categories?: string[]) => {
  const query: any = {};

  if (productName) {
    query.productName = {
      $regex: new RegExp(productName, 'i') // 'i' makes it case insensitive
    };
  }

  if (categories && categories.length > 0) {
    query.category = { $in: categories };
  }

  return query;
};

const getAllProducts = async (page: number = EPagingDefaults.pageIndex, limit: number = EPagingDefaults.pageSize): Promise<any> => {
  try {
    const skip = (page - 1) * limit;

    const products = await ModalProduct.find({})
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']])
      .skip(skip)
      .limit(limit);

    return products;
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getBestSellerProducts = async (
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize
): Promise<any> => {

  const skip = (page - 1) * limit;

  try {
    return ModalProduct.find({})
      .skip(skip)
      .limit(limit)
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort({ quantity: ESort.DESC });
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getProductById = async (productId: string): Promise<any> => {
  if (!productId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }
  try {
    return ModalProduct.findById(productId)
      .select({ password: 0, __v: 0, updatedAt: 0 });
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getProductByCategoryId = async (categoryId: string): Promise<any> => {
  if (!categoryId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }
  try {
    return ModalProduct.find({ category_id: categoryId })
      .select({ password: 0, __v: 0, updatedAt: 0 });
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getProductByCategoryName = async (
  categoryName: string,
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize
): Promise<any> => {
  if (!categoryName) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  const categoryId = await getCategoryByName(categoryName);
  if (!categoryId || categoryId === null) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT,
      data: []
    }
  }

  const skip = (page - 1) * limit;

  try {
    return ModalProduct.find({ category_id: categoryId._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: ESort.DESC })
      .select({ __v: 0 });
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const createProduct = async (product: any): Promise<any> => {
  if (!product) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    return ModalProduct.create(product)
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const likeProduct = async (productId: string, isLiked: boolean): Promise<any> => {
  if (!productId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_PRODUCT
    }
  }

  try {
    const product = await ModalProduct.findByIdAndUpdate(productId, { $set: { isLiked: isLiked } }, { new: true });
    return product?.isLiked;
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getAllProductLiked = async (page: number = EPagingDefaults.pageIndex, limit: number = EPagingDefaults.pageSize): Promise<any> => {
  try {
    const skip = (page - 1) * limit;

    const products = await ModalProduct.find({ isLiked: true })
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']])
      .skip(skip)
      .limit(limit);

    return products
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const searchProducts = async (
  productName: string,
  categories?: string[],
  page: number = EPagingDefaults.pageIndex,
  limit: number = EPagingDefaults.pageSize,
  sort: Sort = { createdAt: ESort.DESC }
): Promise<any> => {

  try {
    const skip = (page - 1) * limit;
    const query = buildQuery(productName, categories);
    return ModalProduct.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select({ password: 0, __v: 0, updatedAt: 0 })
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}
export {
  buildQuery,
  createProduct,
  getAllProductLiked,
  getAllProducts,
  getBestSellerProducts,
  getProductByCategoryId,
  getProductByCategoryName,
  getProductById,
  likeProduct,
  searchProducts
};

