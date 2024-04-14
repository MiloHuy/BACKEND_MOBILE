import express from 'express';
import multer from 'multer';
import { initializeFirebaseApp } from '../config/firebase.config';
import { handleCreateBrand, handleGetAllBrands, handleGetBrandById, handleGetBrandByName } from '../controller/brand/brand.controller';

const routerBrand = express.Router();

initializeFirebaseApp();

const upload = multer({ storage: multer.memoryStorage() });

const ROUTER_BRAND_API = {
  GET: {
    getAllBrands: '/api/brands',
    getBrandById: '/api/brands/:brandId',
    getBrandByName: '/api/brands/:brandName'
  },
  POST: {
    createBrand: '/api/create/brands'
  },
  PUT: {},
  DELETE: {}
}

routerBrand.get(ROUTER_BRAND_API.GET.getAllBrands, handleGetAllBrands)
routerBrand.get(ROUTER_BRAND_API.GET.getBrandById, handleGetBrandById)
routerBrand.get(ROUTER_BRAND_API.GET.getBrandByName, handleGetBrandByName)

routerBrand.post(ROUTER_BRAND_API.POST.createBrand, upload.single('brandImg'), handleCreateBrand)

export default routerBrand
