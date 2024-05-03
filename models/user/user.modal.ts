import { Document, model } from "mongoose";
import { IResponseUser } from '../../services/user/interface';
import { userSchema } from "./shema";

export const nameModelUser = 'users';
export const ModalUser = model<IResponseUser & Document>(nameModelUser, userSchema);
