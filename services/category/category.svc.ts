import { EApiStatus } from "../../constanst/api.const"
import { ECode, EMessage } from "../../constanst/code-mess.const"
import { ModalCategory } from "../../models/category/category.model"
import { IRequestCreateCategory } from "./interface"

const getCategoryById = async (categoryId: string): Promise<Record<string, unknown | number> | null> => {
  if (!categoryId) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_CATEGORY
    }
  }

  try {
    return ModalCategory.findById(categoryId)
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getCategoryByName = async (categoryName: string): Promise<Record<string, unknown> | null> => {
  if (!categoryName) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_CATEGORY
    }
  }

  try {
    return ModalCategory.findOne({ categoryName })
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const getAllCategories = async (): Promise<any> => {
  try {
    const categories = await ModalCategory.find({}).select({ password: 0, __v: 0, updatedAt: 0 })
    return categories
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

const createCategory = async (categoryName: IRequestCreateCategory['body']['categoryName']): Promise<any> => {
  if (!categoryName) {
    return {
      code: ECode.NOT_FOUND,
      message: EMessage.NOT_FOUND_CATEGORY
    }
  }

  try {
    const category = ModalCategory.create(categoryName)
    return category
  } catch (e) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    }
  }
}

export { createCategory, getAllCategories, getCategoryById, getCategoryByName }

