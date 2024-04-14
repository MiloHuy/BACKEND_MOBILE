import { NextFunction, Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { ERoleType } from "../../models/user-role-permission/schema";
import { IRequestLogin, IRequestRegister } from "../../services/user/interface";
import { createUser, getRoleIdUser, getUserByEmail, getUserByPhone } from "../../services/user/user.svc";
import { hashPassword, isMatch } from "../../utils";
import { handleGetFileUtils } from "../../utils/file.utils";

const handleLogin = catchAsync(
  async (req: Request<{}, {}, IRequestLogin['body']>, res: Response, next: NextFunction) => {
    if (!req) return

    const { email, password } = req.body;

    const User = await getUserByEmail(email);
    if (User.status === EApiStatus.Fail || User.response === undefined) {
      return res.status(ECode.FAIL).json({
        code: User.code,
        message: User.message,
      })
    }

    const { response } = User
    /**
     * Indicates whether the provided password matches the password stored in the user's record.
     */
    const isMatchPassword = await isMatch(response.password, password);

    if (!isMatchPassword) {
      return res.status(ECode.FAIL).json({
        code: ECode.FAIL,
        message: EMessage.PASSWORD_ERROR
      })
    }
    return res.status(ECode.SUCCESS).json({
      code: User.code,
      data: response
    })
  })

const handleRegister = catchAsync(
  async (req: Request<{}, {}, IRequestRegister['body']['user']>, res: Response, next: NextFunction) => {
    let avatarDefault = ''
    const [existedEmail, existedPhone] = await Promise.all([
      getUserByEmail(req.body.email),
      getUserByPhone(req.body.phone),
    ]);

    if (existedEmail.status === EApiStatus.Success) {
      return res.status(ECode.FAIL).json({
        code: existedEmail.code,
        message: EMessage.EMAIL_EXIST
      })
    }

    if (existedPhone.status === EApiStatus.Success) {
      return res.status(ECode.FAIL).json({
        code: existedPhone.code,
        messages: EMessage.PHONE_EXIST
      })
    }

    if (!req.body.avatar || req.body.avatar === undefined) {
      const result = await handleGetFileUtils('UserDefault.jpg')
      if (result.urlFile !== undefined && result.status === EApiStatus.Success) {
        avatarDefault = result.urlFile
      }
    }
    else { avatarDefault = req.body.avatar }
    // Prepare data for creating new user
    const encryptedPassword = await hashPassword(req.body.password);
    const roleId = await getRoleIdUser(ERoleType.USER)

    const user = await createUser({
      email: req.body.email,
      password: encryptedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      avatar: avatarDefault,
      role_id: roleId._id
    });

    if (user?.error) { return res.status(user.code).json({ user }) };

    ['password', '__v', 'createdAt', 'updatedAt'].forEach((field) => {
      delete user._doc[field];
    });
    // Return response
    return res.status(201).json({
      status: 'Created',
      code: 201,
      message: 'Đăng ký thành công'
    });
  }
)

export {
  handleLogin,
  handleRegister
};

