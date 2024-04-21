import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { EArrayIndex, EPagingDefaults } from "../../constanst/app.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { IRequestAddToCart, IRequestConfirmOrder, IRequestGetAllOrdersByStatus, IRequestGetAllOrdersByUserId, IRequestUpdateStatusOrder } from "../../services/order/interface";
import { confirmOrder, createOrder, getAllOrderByStatus, getAllOrderByUserId, getAllOrders, getAllProductOrderByUserId, updateOrderByUserId, updateStatusOrder } from "../../services/order/order.svc";

const handleGetOrderByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const orders = await getAllOrderByUserId(req.params.userId);

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    if (orders.status && orders.status === EApiStatus.Error) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get order by user id successfully',
      data: orders
    })
  }
)

const handleGetAllOrders = catchAsync(
  async (req: Request, res: Response) => {
    const orders = await getAllOrders();

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    if (orders.status && orders.status === EApiStatus.Error) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: 'Get all orders successfully',
      data: orders
    })
  }
)

const handleGetAllOrdersByUserId = catchAsync(
  async (req: Request<IRequestGetAllOrdersByUserId['params'], any, any>, res: Response) => {
    const orders = await getAllOrderByUserId(req.params.userId);

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(ECode.FAIL).json({
        code: ECode.FAIL,
        message: orders.message
      });
    }

    if (orders.status && orders.status === EApiStatus.Error) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    console.log('orders', orders)

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.GET_PRODUCT_SUCCESS,
      data: orders
    })
  }
)

const handleGetAllOrdersByStatus = catchAsync(
  async (req: Request<IRequestGetAllOrdersByStatus['params'], IRequestGetAllOrdersByStatus['body'], any>, res: Response) => {

    const page = Number(req.query.page) || EPagingDefaults.pageIndex;
    const limit = Number(req.query.limit) || EPagingDefaults.pageSize;

    const orders = await getAllOrderByStatus(req.body.status, page, limit, req.params.userId);

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    if (orders.status && orders.status === EApiStatus.Error) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.GET_PRODUCT_SUCCESS,
      data: orders
    })
  }
)

const handleAddToCart = catchAsync(
  async (req: Request<any, IRequestAddToCart['body'], any>, res: Response) => {

    const { productId, userId, productPrice, productQuanitiOrder } = req.body;
    const allProduct = await getAllProductOrderByUserId(userId);

    if (allProduct.status && allProduct.status === EApiStatus.Error) {
      return res.status(ECode.MONGO_SERVER_ERROR).json({
        code: ECode.MONGO_SERVER_ERROR,
        message: allProduct.message
      });
    }

    if (!Array.isArray(allProduct) || allProduct.length === 0) {
      const order = await createOrder(req.body);

      if (order.code && order.code === ECode.NOT_FOUND) {
        return res.status(order.code).json({
          message: order.message
        });
      }

      if (order.status && order.status === EApiStatus.Error) {
        return res.status(order.code).json({
          message: order.message
        });
      }

      return res.status(ECode.SUCCESS).json({
        status: ECode.SUCCESS,
        message: EMessage.ADD_TO_CART_SUCCESSFULLY,
        data: order
      })
    }

    const { productId: allProductId, productPrice: allProductPrice, productQuanitiOrder: allProductQuanitiOrder } = allProduct[0];

    const productIndex = allProductId.findIndex((id: string) => id === productId);

    if (productIndex === EArrayIndex.NOT_FOUND) {
      allProductId.push(productId);
      allProductPrice.push(productPrice);
      allProductQuanitiOrder.push(productQuanitiOrder);
    }

    allProductPrice[productIndex] += productPrice;
    allProductQuanitiOrder[productIndex] += productQuanitiOrder;

    const order = await updateOrderByUserId(userId, {
      productId: allProductId,
      userId,
      productPrice: allProductPrice,
      productQuanitiOrder: allProductQuanitiOrder,
      productSize: req.body.productSize,
    });

    if (order.code && order.code === ECode.NOT_FOUND) {
      return res.status(order.code).json({
        message: order.message
      });
    }

    if (order.status && order.status === EApiStatus.Error) {
      return res.status(order.code).json({
        message: order.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.ADD_TO_CART_SUCCESSFULLY,
      data: order
    })
  }
)

const handleConfirmOrder = catchAsync(
  async (req: Request<IRequestConfirmOrder['params'], IRequestConfirmOrder['body'], any>, res: Response) => {
    const order = await confirmOrder(req.params.orderId, req.body.confirm);

    if (order.code && order.code === ECode.NOT_FOUND) {
      return res.status(order.code).json({
        message: order.message
      });
    }

    if (order.status && order.status === EApiStatus.Error) {
      return res.status(order.code).json({
        message: order.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.CONFIRM_ORDER_SUCCESSFULLY,
      data: order
    })
  }
)

const handleUpdateOrderByStatus = catchAsync(
  async (req: Request<IRequestUpdateStatusOrder['params'], IRequestUpdateStatusOrder['body'], any>, res: Response) => {
    const orders = await updateStatusOrder(req.params.orderId, req.body.status);

    if (orders.code && orders.code === ECode.NOT_FOUND) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    if (orders.status && orders.status === EApiStatus.Error) {
      return res.status(orders.code).json({
        message: orders.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      status: ECode.SUCCESS,
      message: EMessage.GET_PRODUCT_SUCCESS,
      data: orders
    })
  }
)

export {
  handleAddToCart,
  handleConfirmOrder,
  handleGetAllOrders, handleGetAllOrdersByStatus, handleGetAllOrdersByUserId,
  handleGetOrderByUserId,
  handleUpdateOrderByStatus
};

