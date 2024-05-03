import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { createCategory, getAllCategories, getCategoryById, getCategoryByName } from "../../services/category/category.svc";
import { IRequestCreateCategory } from "../../services/category/interface";

const handleGetAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const categories = await getAllCategories();

    if (categories.code && categories.code === ECode.MONGO_SERVER_ERROR) {
      return res.status(categories.code).json({
        message: categories.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get all categories successfully',
      data: categories
    })
  })

const handleGetCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const category = await getCategoryById(req.params.categoryId);

    if (category === null) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_CATEGORY
      })
    }

    if (category.code && category.code === ECode.NOT_FOUND) {
      return res.status(category.code).json({
        code: category.code,
        message: category.message
      });
    }

    if (category.status && category.status === EApiStatus.Error) {
      return res.status(category.code as number).json({
        code: category.code,
        message: category.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get category by id successfully',
      data: category
    })
  })

const handleGetCategoryByName = catchAsync(
  async (req: Request, res: Response) => {
    const category = await getCategoryByName(req.params.categoryName);

    if (category === null) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_CATEGORY
      })
    }

    if (category.code && category.code === ECode.NOT_FOUND) {
      return res.status(category.code).json({
        code: category.code,
        message: category.message
      });
    }

    if (category.status && category.status === EApiStatus.Error) {
      return res.status(category.code as number).json({
        code: category.code,
        message: category.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get category by name successfully',
      data: category
    })
  })


const handleCreateCategory = catchAsync(
  async (req: Request<any, IRequestCreateCategory['body'], any>, res: Response) => {
    const categoryName: IRequestCreateCategory['body']['categoryName'] = req.body;

    if (!categoryName) {
      return res.status(400).json({
        message: 'Category name is required'
      });
    }

    const category = await createCategory(categoryName);

    if (category.code && category.code === ECode.MONGO_SERVER_ERROR) {
      return res.status(category.code).json({
        message: category.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Create category successfully',
      data: category
    })
  })

export { handleCreateCategory, handleGetAllCategories, handleGetCategoryById, handleGetCategoryByName };

