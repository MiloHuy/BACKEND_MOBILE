import express from 'express';
import multer from "multer";
import { initializeFirebaseApp } from '../config/firebase.config';
import { handleCreateProduct, handleGetAllProductLiked, handleGetAllProducts, handleGetProductBestSeller, handleGetProductByCategoryId, handleGetProductByCategoryName, handleGetProductById, handleLikeProduct, handleSearchProducts } from '../controller/product/product.controller';
import { productIdSchema, productSchema } from '../controller/product/product.validation';
import validateRequestMiddleware from '../middlewares/validate-request.mid';
const routerProduct = express.Router();

initializeFirebaseApp();

const upload = multer({ storage: multer.memoryStorage() });

const ROUTER_PRODUCT_API = {
  GET: {
    all: '/api/products/all',
    search: '/api/products/search',
    productId: '/api/products/:productId',
    bestSellerProducts: '/api/product/bestSeller',
    allProductLikded: '/api/product/liked',
    filterProductByCategoryId: '/api/filter/products/:categoryId',
    filterProductByCategoryName: '/api/filter/product/:categoryName',
  },
  POST: {
    create: '/api/product/create',
    likeProduct: '/api/product/like/:productId',
  },
}

routerProduct.get(ROUTER_PRODUCT_API.GET.all, handleGetAllProducts)
routerProduct.get(ROUTER_PRODUCT_API.GET.search, handleSearchProducts)
routerProduct.get(ROUTER_PRODUCT_API.GET.productId, handleGetProductById)
routerProduct.get(ROUTER_PRODUCT_API.GET.allProductLikded, handleGetAllProductLiked)
routerProduct.get(ROUTER_PRODUCT_API.GET.filterProductByCategoryId, handleGetProductByCategoryId)
routerProduct.get(ROUTER_PRODUCT_API.GET.filterProductByCategoryName, handleGetProductByCategoryName)
routerProduct.get(ROUTER_PRODUCT_API.GET.bestSellerProducts, handleGetProductBestSeller)

routerProduct.post(ROUTER_PRODUCT_API.POST.create, upload.single('productImg'), validateRequestMiddleware('body', productSchema), handleCreateProduct)
routerProduct.post(ROUTER_PRODUCT_API.POST.likeProduct, validateRequestMiddleware('params', productIdSchema), handleLikeProduct)

export default routerProduct
