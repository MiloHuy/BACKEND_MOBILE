import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { createBrand, getAllBrands, getBrandById, getBrandByName } from "../../services/brand/brand.svc";
import { IRequestCreateBrand } from "../../services/brand/interface";
import { handleUploadFileUtils } from "../../utils/file.utils";

const handleGetAllBrands = catchAsync(
  async (req: Request, res: Response) => {
    const brands = await getAllBrands();

    if (brands.code && brands.code === ECode.MONGO_SERVER_ERROR) {
      return res.status(brands.code).json({
        message: brands.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get all brands successfully',
      data: brands
    })
  }
)

const handleGetBrandById = catchAsync(
  async (req: Request, res: Response) => {
    const brand = await getBrandById(req.params.brandId);

    if (brand.code && brand.code === ECode.NOT_FOUND) {
      return res.status(brand.code).json({
        message: brand.message
      });
    }

    if (brand.status && brand.status === EApiStatus.Error) {
      return res.status(brand.code).json({
        message: brand.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get brand by id successfully',
      data: brand
    })
  })

const handleGetBrandByName = catchAsync(
  async (req: Request, res: Response) => {
    const brand = await getBrandByName(req.params.brandName);

    if (brand.code && brand.code === ECode.NOT_FOUND) {
      return res.status(brand.code).json({
        message: brand.message
      });
    }

    if (brand.status && brand.status === EApiStatus.Error) {
      return res.status(brand.code).json({
        message: brand.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get brand by name successfully',
      data: brand
    })
  })

const handleCreateBrand = catchAsync(
  async (req: Request<any, any, IRequestCreateBrand['query']>, res: Response) => {
    const brandReq: IRequestCreateBrand['query'] = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: 'No file was uploaded'
      });
    }

    const fileUpload = await handleUploadFileUtils(req.file, 'brands')

    const brand = await createBrand({
      brandName: brandReq.brandName,
      brandImg: fileUpload.urlFile ? fileUpload.urlFile : '',
      brandAddress: brandReq.brandAddress,
      brandRate: brandReq.brandRate,
      description: brandReq.description
    });

    if (brand.code && brand.code === ECode.NOT_FOUND) {
      return res.status(brand.code).json({
        code: brand.code,
        message: brand.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Create brand successfully',
      data: brand
    })
  })

export { handleCreateBrand, handleGetAllBrands, handleGetBrandById, handleGetBrandByName };

