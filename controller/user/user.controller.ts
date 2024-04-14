import { Request, Response } from "express";
import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { ERoleType } from "../../models/user-role-permission/schema";
import { IRequestUpdateUser, IRequestUserId } from "../../services/user/interface";
import { createRolePermission, createUser, getRoleIdUser, getUserByEmail, getUserById, getUserByPhone, updateUser } from "../../services/user/user.svc";
import { generateAccessToken, hashPassword } from "../../utils";
import { handleGetFileUtils } from "../../utils/file.utils";

const handleCreateUserRolePermission = catchAsync(
  async (req: Request, res: Response) => {
    const userPermission = await createRolePermission(req.body)
    if (userPermission?.error) {
      return res.status(500).json({ error: userPermission })
    }

    return res.status(200).json({
      message: 'Tạo role thành công',
      userPermission
    });
  }
)

const handleGetUserById = catchAsync(
  async (req: Request, res: Response) => {
    const user = await getUserById(req.params.userId);

    if (user.code && user.code === ECode.NOT_FOUND) {
      return res.status(ECode.FAIL).json({
        code: user.code,
        message: user.message
      });
    }

    if (user.status && user.status === EApiStatus.Error) {
      return res.status(ECode.FAIL).json({
        code: user.code,
        message: user.message
      });
    }
    return res.status(200).json({
      message: 'Lấy thông tin user thành công',
      user
    });
  }
)

const handleCreateUser = catchAsync(
  async (req: Request, res: Response) => {

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

    if (!req.body.avatar) {
      const result = await handleGetFileUtils('UserDefault.jpg')
      if (result.urlFile !== undefined && result.status === EApiStatus.Success) {
        avatarDefault = result.urlFile
      }
    }
    else {
      avatarDefault = req.body.avatar
    }
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
    const accessToken = generateAccessToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    // Return response
    return res.status(201).json({
      status: EApiStatus.Success,
      code: 201,
      message: EMessage.CREATE_USER_SUCCESS,
    });
  }
)

const handleUpdateUser = catchAsync(
  async (req: Request<IRequestUserId['params'], IRequestUpdateUser['body'], any>, res: Response) => {
    //if (!req.file || !req.file.buffer) {
    //return res.status(ECode.BAD_REQUEST).json({
    //message: EMessage.NO_FILE_CHOOSE
    //});
    //}

    //const fileUpload = await handleUploadFileUtils(req.file, EFireBaseFolder.USERS)

    const updatedUser = await updateUser(req.params.userId, {
      ...req.body,
      //avatar: fileUpload.urlFile ? fileUpload.urlFile : ''
    });

    if (updatedUser.code && updatedUser.code === ECode.NOT_FOUND) {
      return res.status(ECode.FAIL).json({
        code: updatedUser.code,
        message: updatedUser.message
      });
    }

    return res.status(ECode.SUCCESS).json({
      code: ECode.SUCCESS,
      message: EMessage.UPDATE_USER_SUCCESS,
      updatedUser
    });
  }
)

export { handleCreateUser, handleCreateUserRolePermission, handleGetUserById, handleUpdateUser };

