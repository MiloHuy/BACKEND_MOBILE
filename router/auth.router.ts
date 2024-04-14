import express from 'express';
import { handleLogin, handleRegister } from '../controller/auth';
import { loginSchema, registerSchema } from '../controller/auth/auth.validation';
import validateRequestMiddleware from '../middlewares/validate-request.mid';

const routerAuth = express.Router();

const ROUTER_AUTH_API = {
  GET: {},
  POST: {
    login: '/api/auth/login',
    registerUser: '/api/auth/register',
  },
  PUT: {},
  DELETE: {}
}

routerAuth.post(ROUTER_AUTH_API.POST.registerUser, validateRequestMiddleware('body', registerSchema), handleRegister)
routerAuth.post(ROUTER_AUTH_API.POST.login, validateRequestMiddleware('body', loginSchema), handleLogin)

export default routerAuth
