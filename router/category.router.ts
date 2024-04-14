import express from 'express';
import { handleCreateCategory, handleGetAllCategories, handleGetCategoryById } from '../controller/category/category.controller';

const routerCategory = express.Router();

const ROUTER_CATEGORY_API = {
  GET: {
    all: '/api/category/all',
    categoryId: '/api/category/:categoryId',
  },
  POST: {
    create: '/api/category/create',
  },
  PUT: {},
  DELETE: {}
}

routerCategory.get(ROUTER_CATEGORY_API.GET.all, handleGetAllCategories)
routerCategory.get(ROUTER_CATEGORY_API.GET.categoryId, handleGetCategoryById)
routerCategory.post(ROUTER_CATEGORY_API.POST.create, handleCreateCategory)

export default routerCategory
