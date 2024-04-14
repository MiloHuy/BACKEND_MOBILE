import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ModalUser } from "../../models/user/user.modal";

const registerUser = async (email: string) => {
  const findUser = await ModalUser.findOne({ email })

  if (findUser) {
    return {
      code: ECode.FAIL,
      message: 'Email đã tồn tại trong hệ thống'
    }
  }
  const num: number = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  const otp = num.toString().padStart(6, '0');

  return {
    code: ECode.SUCCESS,
    otp,
    message: EMessage.OTP_SUCCESS
  }
}

export {
  registerUser
};

