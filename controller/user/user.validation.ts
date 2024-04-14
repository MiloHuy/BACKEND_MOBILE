import { mixed, object, ObjectSchema, string } from "yup";
import { IRequestUpdateUser } from "../../services/user/interface";
import { genMessNotValid, genMessRequired } from "../utils";
import { ICreateUserSchema } from "./interface";

const userIdSchema: ObjectSchema<any, unknown> = object().shape({
  userId: string()
    .required(genMessRequired('userId'))
});

const createUserSchema: ObjectSchema<Record<keyof ICreateUserSchema, unknown>> = object().shape({
  email: string()
    .required(genMessRequired('email'))
    .email(genMessNotValid('email')),
  password: string()
    .required(genMessRequired('password'))
    .min(6, 'Mật khẩu có ít nhất 6 kí tự')
  ,
  fullName: string()
    .required(genMessRequired('fullName'))
  ,
  phone: string()
    .required(genMessRequired('phone'))
    .matches(/^(0|\+84)([0-9]{9})$/, genMessNotValid('Số điện thoại'))
  ,
  gender: mixed()
    .oneOf(['MALE', 'FEMALE', 'OTHER'] as const, genMessNotValid('Giới tính'))
    .default('OTHER'),
});

const updateUserSchema: ObjectSchema<Record<keyof IRequestUpdateUser['body'], unknown>> = object().shape({
  email: string()
    .email(genMessNotValid('email')),
  phone: string()
    .matches(/^(0|\+84)([0-9]{9})$/, genMessNotValid('Số điện thoại'))
  ,
  fullName: string(),
  address: string(),
  avatar: string()
});

export { createUserSchema, updateUserSchema, userIdSchema };

