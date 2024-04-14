import { mixed, number, object, ObjectSchema, string } from "yup";
import { IRequestRegister } from "../../services/user/interface";
import { genMessRequired } from "../utils";

const loginSchema: ObjectSchema<any, unknown> = object({
  email: string()
    .required(genMessRequired('email'))
    .email(),
  password: string()
    .required(genMessRequired('Mật khẩu'))
    .min(6, 'Nhập tối thiểu 6 kí tự'),
});

const registerSchema: ObjectSchema<Record<keyof IRequestRegister['body']['user'], unknown>> = object().shape({
  email: string()
    .required(genMessRequired('email'))
    .email('Email không hợp lệ'),
  password: string()
    .required(genMessRequired('Mật khẩu'))
    .min(6, 'Nhập tối thiểu 6 kí tự'),
  fullName: string()
    .required(genMessRequired('Họ và tên')),
  phone: number()
    .required(genMessRequired('phone')),
  gender: mixed()
    .oneOf(['MALE', 'FEMALE', 'OTHER'] as const)
    .default('OTHER'),
  address: string(),
  role_id: string(),
  avatar: string()
});

const verifyOtpSchema: ObjectSchema<any, unknown> = object().shape({
  email: string()
    .required(genMessRequired('email'))
    .email('Email không hợp lệ'),
  otpCode: string()
    .required(genMessRequired("OTP"))
})

export {
  loginSchema,
  registerSchema,
  verifyOtpSchema
};

