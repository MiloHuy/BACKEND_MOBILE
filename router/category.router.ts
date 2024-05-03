import express from 'express';
import { handleCreateCategory, handleGetAllCategories, handleGetCategoryById, handleGetCategoryByName } from '../controller/category/category.controller';

const routerCategory = express.Router();

const ROUTER_CATEGORY_API = {
  GET: {
    all: '/api/category/all',
    categoryId: '/api/category/:categoryId',
    categoryName: '/api/category/name/:categoryName',
  },
  POST: {
    create: '/api/category/create',
  },
  PUT: {},
  DELETE: {}
}

routerCategory.get(ROUTER_CATEGORY_API.GET.all, handleGetAllCategories)
routerCategory.get(ROUTER_CATEGORY_API.GET.categoryId, handleGetCategoryById)
routerCategory.get(ROUTER_CATEGORY_API.GET.categoryName, handleGetCategoryByName)

routerCategory.post(ROUTER_CATEGORY_API.POST.create, handleCreateCategory)

export default routerCategory
