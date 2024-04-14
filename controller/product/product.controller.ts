import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { EPagingDefaults, ESort } from "../../constanst/app.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { getBrandByName } from "../../services/brand/brand.svc";
import { getCategoryByName } from "../../services/category/category.svc";
import { IRequestCreateProduct } from "../../services/product/interface";
import { createProduct, getAllProductLiked, getAllProducts, getBestSellerProducts, getProductByCategoryId, getProductByCategoryName, getProductById, likeProduct, searchProducts, Sort } from "../../services/product/product.svc";
import { handleUploadFileUtils } from "../../utils/file.utils";

const handleGetAllProducts = catchAsync(
  async (req: Request, res: Response) => {

    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    const product = await getAllProducts(page, limit);

    if (product.code && product.code === ECode.MONGO_SERVER_ERROR) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get all products successfully',
      data: product
    })
  }
)

const handleGetProductById = catchAsync(
  async (req: Request, res: Response) => {
    const product = await getProductById(req.params.productId);

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get product by id successfully',
      data: product
    })
  })

const handleGetProductByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const product = await getProductByCategoryId(req.params.categoryId);

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get product by category successfully',
      data: product
    })
  })

const handleGetProductBestSeller = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    const product = await getBestSellerProducts(Number(page), Number(limit));

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get best selling products successfully',
      data: product
    })
  })

const handleGetProductByCategoryName = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    const product = await getProductByCategoryName(req.params.categoryName, page, limit);

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(ECode.FAIL).json({
        code: product.code,
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(ECode.FAIL).json({
        code: product.code,
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      code: ECode.SUCCESS,
      message: 'Get product by category successfully',
      data: product
    })
  })

const handleCreateProduct = catchAsync(
  async (req: Request<any, any, IRequestCreateProduct['query']>, res: Response) => {
    const productReq: IRequestCreateProduct['query'] = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: 'No file was uploaded'
      });
    }

    const fileUpload = await handleUploadFileUtils(req.file, 'products')

    const categoryId = await getCategoryByName(productReq.category);

    if (categoryId === null) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_CATEGORY
      });
    }

    if (categoryId.code && categoryId.code === ECode.NOT_FOUND) {
      return res.status(categoryId.code).json({
        code: categoryId.code,
        message: categoryId.message
      });
    }

    if (categoryId.status && categoryId.status === EApiStatus.Error) {
      return res.status(categoryId.code as number).json({
        code: categoryId.code,
        message: categoryId.message
      });
    }

    const brandId = await getBrandByName(productReq.brand);

    if (brandId === null) {
      return res.status(ECode.FAIL).json({
        code: ECode.NOT_FOUND,
        message: EMessage.NOT_FOUND_BRAND
      });
    }

    if (brandId.code && brandId.code === ECode.NOT_FOUND) {
      return res.status(brandId.code).json({
        code: brandId.code,
        message: brandId.message
      });
    }

    if (brandId.status && brandId.status === EApiStatus.Error) {
      return res.status(brandId.code as number).json({
        code: brandId.code,
        message: brandId.message
      });
    }

    const product = await createProduct({
      productName: productReq.productName,
      productImg: fileUpload.urlFile ? fileUpload.urlFile : '',
      category_id: categoryId._id,
      brand_id: brandId._id,
      price: productReq.price,
      size: productReq.size,
      productRate: productReq.rate,
      description: productReq.description,
      quantity: productReq.quantity
    });

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.CREATE_PRODUCT_SUCCESS,
      data: product
    })
  })

const handleLikeProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await getProductById(req.params.productId);

    if (product.code && product.code === ECode.NOT_FOUND) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    if (product.status && product.status === EApiStatus.Error || product.isLiked === undefined) {
      return res.status(product.code).json({
        product
      });
    }

    const productCheckLike = await likeProduct(req.params.productId, !product.isLiked);

    switch (productCheckLike) {
      case true:
        return res.status(ECode.SUCCESS).json({
          status: ECode.SUCCESS,
          message: EMessage.LIKE_PRODUCT_SUCCESS,
        });
      case false:
        return res.status(ECode.SUCCESS).json({
          status: ECode.SUCCESS,
          message: EMessage.UNLIKE_PRODUCT_SUCCESS,
        });
    }

    return res.status(ECode.FAIL).json({
      status: ECode.FAIL,
      message: EMessage.LIKE_PRODUCT_FAIL
    })
  }
)

const handleGetAllProductLiked = catchAsync(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    const product = await getAllProductLiked(page, limit);

    if (product.code && product.code === ECode.MONGO_SERVER_ERROR) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.GET_PRODUCT_SUCCESS,
      data: product
    })
  }
)

const handleSearchProducts = catchAsync(
  async (req: Request<any, IRequestCreateProduct['query']>, res: Response) => {

    const productName = req.query.productName as string;

    let categories: string[] = [];
    if (typeof req.query.categories === 'string') {
      try {
        categories = JSON.parse(req.query.categories);
      } catch (err) {
        console.error('Failed to parse categories parameter', err);
      }
    } else if (Array.isArray(req.query.categories)) {
      categories = req.query.categories.map(category => String(category));
    }

    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    let sort: Sort = { createdAt: ESort.DESC };
    if (typeof req.query.sort === 'string') {
      try {
        sort = JSON.parse(req.query.sort);
      } catch (err) {
        console.error('Failed to parse sort parameter', err);
      }
    }

    const product = await searchProducts(productName, categories, page, limit, sort);

    if (product.status && product.status === EApiStatus.Error) {
      return res.status(product.code).json({
        message: product.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Search products successfully',
      data: product
    });
  }
);

export {
  handleCreateProduct,
  handleGetAllProductLiked,
  handleGetAllProducts,
  handleGetProductBestSeller,
  handleGetProductByCategoryId,
  handleGetProductByCategoryName,
  handleGetProductById,
  handleLikeProduct,
  handleSearchProducts
};

