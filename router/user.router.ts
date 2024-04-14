import express from 'express';
import multer from 'multer';
import { initializeFirebaseApp } from '../config/firebase.config';
import { handleCreateUserRolePermission, handleGetUserById, handleUpdateUser } from '../controller/user/user.controller';
import { updateUserSchema, userIdSchema } from '../controller/user/user.validation';
import validateRequestMiddleware from '../middlewares/validate-request.mid';
import { deleteUser } from '../services/user/user.svc';

initializeFirebaseApp();

const upload = multer({ storage: multer.memoryStorage() });

const routerUser = express.Router();

const ROUTER_USER_API = {
  GET: {
    userInfo: '/api/users/:userId',
  },
  POST: {
    role_permissions: '/api/users/rolePermissions',
  },
  PUT: {
    updateUser: '/api/update/users/:userId',
  },
  DELETE: {}
}

routerUser.get(
  ROUTER_USER_API.GET.userInfo,
  validateRequestMiddleware('params', userIdSchema),
  handleGetUserById
)

routerUser.put(
  ROUTER_USER_API.PUT.updateUser,
  upload.single('avatar'),
  validateRequestMiddleware('body', updateUserSchema),
  handleUpdateUser
)

routerUser.post(
  ROUTER_USER_API.POST.role_permissions,
  handleCreateUserRolePermission

)
routerUser
  .route('/:userId')
  .all(validateRequestMiddleware('params', userIdSchema))
  // .get(getUserById)
  // .patch(uploadFilesUtils.single('avatar'), updateUser``)
  .delete(deleteUser);


export default routerUser
