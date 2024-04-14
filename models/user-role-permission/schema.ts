import { Schema } from "mongoose";
import { IUserRolePerMissionSchema } from "./interface";

export enum ERoleType {
  GUEST = 'GUEST',
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export const userRolePermissionSchema: Schema<IUserRolePerMissionSchema> = new Schema({
  role_name: {
    type: String,
    enum: ERoleType,
    unique: true
  },
  permissions: [String],
}, { timestamps: true });
