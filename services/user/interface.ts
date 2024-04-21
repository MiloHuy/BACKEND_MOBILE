import mongoose from "mongoose";
import { TGender } from "../../models/user/interface";
import { IResponse } from "../interface";

export interface QueryObject {
  [key: string]: any;
}

export interface IRequestLogin {
  body: {
    email: string;
    password: string
  }
}

export interface IRequestUserId {
  params: {
    userId: string
  }
}

export interface IRequestRegister {
  body: {
    user: {
      email: string;
      password: string,
      fullName: string
      phone: number
      gender: TGender
      address: string
      role_id?: typeof mongoose.Schema.ObjectId
      avatar?: string
    }
  }
}

export interface IRequestUpdateUser {
  body: {
    email?: string
    phone?: string
    fullName?: string
    address?: string
    avatar?: string
  }
}

export interface IResponseUser extends IResponse {
  response?: {
    email: string;
    password: string;
    fullname: string;
    phone: number;
    gender: TGender;
    address: string;
    role_id?: typeof mongoose.Schema.ObjectId;
  }
}

