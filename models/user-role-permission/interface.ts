import { Document } from "mongoose";
import { ERoleType } from "./schema";

export type TGender = 'MALE' | 'FEMALE' | "OTHER"

export interface IUserRolePerMissionSchema extends Document {
  role_name: ERoleType;
  permissions: string[];
}
