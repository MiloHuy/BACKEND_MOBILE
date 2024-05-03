import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ModalBrand } from "../../models/brand/brand.modal";
import { IRequestCreateBrand } from "./interface";

const getAllBrands = async (): Promise<any> => {
  try {
    const brands = await ModalBrand.find({})
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
    return brands;
  }
  catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getBrandById = async (brandId: string): Promise<any> => {
  if (!brandId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_BRAND
    }
  }
  try {
    return ModalBrand.findById(brandId)
      .select({ password: 0, __v: 0, updatedAt: 0 });
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getBrandByName = async (brandName: string): Promise<Record<string, unknown> | null> => {
  if (!brandName) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_BRAND
    }
  }
  try {
    return await ModalBrand.findOne({ brandName: brandName })
  } catch (err) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const createBrand = async (brand: IRequestCreateBrand['query']): Promise<any> => {
  if (!brand) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_BRAND
    }
  }

  try {
    return ModalBrand.create(brand)
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

export { createBrand, getAllBrands, getBrandById, getBrandByName };

