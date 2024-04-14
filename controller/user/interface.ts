import { EGender } from "../../models/user/shema"

export interface IBodyReqRegisterUser {
  email: string
}

export interface ICreateUserSchema {
  email: string,
  password: string,
  fullName: string,
  phone: string,
  gender: EGender,
}
