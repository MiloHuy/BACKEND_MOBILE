import { EOrderStatus } from "../../models/orders/interface"
import { IResponse } from "../interface"

export interface IRequestAddToCart {
  body: {
    userId: string,
    productId: string[],
    productPrice: number[],
    productQuanitiOrder: number[],
    productSize: string[],
  }
}

export interface IRequestConfirmOrder {
  body: {
    confirm: boolean
  }
  params: {
    orderId: string
  }
}

export interface IRequestGetAllOrdersByUserId {
  params: {
    userId: string
  }
}

export interface IRequestGetAllOrdersByStatus {
  params: {
    userId: string
  },
  body: {
    status: EOrderStatus
  }
}

export interface IRequestUpdateStatusOrder {
  params: {
    orderId: string
  },
  body: {
    status: EOrderStatus
  }
}

export interface IResposeGetAllProductByUserId extends IResponse {
  allProduct?: [
    {
      productId: string,
      productPrice: number,
      productQuanitiOrder: number,
    }
  ]
}

export interface IRequestUpdateOrderByField {
  params: {
    orderId: string
  },
  body: {
    productId?: string[],
    productPrice?: number[],
    productQuanitiOrder?: number[],
    productSize?: string[],
    addressOrder?: string,
    status?: EOrderStatus,
    confirm?: boolean
  }
}
