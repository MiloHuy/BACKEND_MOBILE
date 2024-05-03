import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import routerAuth from "./router/auth.router";
import routerBrand from "./router/brand.router";
import routerCategory from "./router/category.router";
import routerFile from "./router/file.router";
import routerOrder from "./router/orders.router";
import routerPayment from "./router/payment.router";
import routerProduct from "./router/product.router";
import routerUser from "./router/user.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routerAuth)
app.use(routerUser)
app.use(routerFile)
app.use(routerProduct)
app.use(routerCategory)
app.use(routerBrand)
app.use(routerOrder)
app.use(routerPayment)

app.use('*', (req, res) => {
  console.log('request path:', req.path)
  return res.status(404).json({
    status: 'Not found',
    statusCode: 404,
    message: `Can not find the api path: ${req.path}`,
  });
});


export default app;
