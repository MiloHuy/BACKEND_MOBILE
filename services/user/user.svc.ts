import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ERoleType } from "../../models/user-role-permission/schema";
import { ModalUserRolePermission } from "../../models/user-role-permission/userRolePermission.model";
import { ModalUser } from "../../models/user/user.modal";
import { IRequestRegister, IRequestUpdateUser, IResponseUser } from "./interface";

type TUserCreate = IRequestRegister['body']['user']

const createUser = async (user: TUserCreate): Promise<any> => {
  if (!user)
    return {
      code: ECode.NOT_FIND_USER,
      message: EMessage.NOT_FIND_USER
    }
  return await ModalUser.create(user)
}

const createRolePermission = async (rolePermission: any): Promise<any> => {
  try {
    return await ModalUserRolePermission.create(rolePermission)
  }
  catch (err) {
    return {
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR,
      err
    };
  }
}

const getRoleIdUser = async (role_name: ERoleType): Promise<any> => {
  try {
    return await ModalUserRolePermission.findOne({ role_name: role_name })
  }
  catch (err) {
    return {
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR,
      err
    };
  }
}

const getAllUsers = async (): Promise<any> => {
  return ModalUser.find({})
    .select({ password: 0, __v: 0, updatedAt: 0 })
    .sort([['createdAt', 'desc']]);
}

const getUserByEmail = async (email: string, exceptSelect = { __v: 0, updatedAt: 0 }): Promise<IResponseUser> => {
  const response = await ModalUser.findOne({ email }).select(exceptSelect).lean() as IResponseUser['response'];

  if (response) {
    return {
      response,
      status: EApiStatus.Success,
      code: ECode.SUCCESS,
      message: EMessage.FIND_USER_SUCCESS
    }
  }

  return {
    status: EApiStatus.Fail,
    code: ECode.NOT_FIND_USER,
    message: EMessage.NOT_FIND_USER
  }
}

const getUserByPhone = async (phone: number, exceptSelect = { __v: 0, updatedAt: 0 }) => {
  const findUser = await ModalUser.findOne({ phone }).select(exceptSelect);

  if (findUser) {
    return {
      findUser,
      status: EApiStatus.Success,
      code: ECode.SUCCESS,
      message: 'Đã tìm thấy user.'
    }
  }

  return {
    status: EApiStatus.Fail,
    code: ECode.NOT_FIND_USER,
    message: EMessage.NOT_FIND_USER
  }
}

const getUserById = async (
  userId: string,
  exceptSelect = { __v: 0, updatedAt: 0 }): Promise<any> => {

  if (!userId) return {
    status: EApiStatus.Fail,
    code: ECode.NOT_FIND_USER,
    message: EMessage.NOT_FIND_USER
  }

  try {
    return await ModalUser.findById(userId).select(exceptSelect);
  } catch (err) {
    return {
      status: EApiStatus.Fail,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR,
      err
    }
  }
}

const updateUser = async (
  userId: string,
  changes: IRequestUpdateUser['body'],
  exceptSelect = {
    password: 0,
    __v: 0,
    updatedAt: 0,
  }): Promise<any> => {

  if (!userId) return {
    status: EApiStatus.Fail,
    code: ECode.NOT_FIND_USER,
    message: EMessage.NOT_FIND_USER
  }

  try {
    return ModalUser.findByIdAndUpdate(userId, changes, { new: true }).select(exceptSelect);
  }
  catch (err) {
    return {
      status: EApiStatus.Fail,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR,
      err
    }
  }
}

const deleteUser = async (userId: string): Promise<any> => {
  if (!userId) return {
    status: EApiStatus.Fail,
    code: ECode.NOT_FIND_USER,
    message: EMessage.NOT_FIND_USER
  }

  return ModalUser.deleteOne({ _id: userId });
}

export {
  createRolePermission, createUser,
  //Delete
  deleteUser,
  //Get
  getAllUsers, getRoleIdUser
  //Update,
  ,








  getUserByEmail, getUserById, getUserByPhone,
  //Update
  updateUser
};

