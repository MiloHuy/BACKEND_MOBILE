import { Document, model } from "mongoose";
import { userRolePermissionSchema } from "./schema";

export const ModalUserRolePermission = model<Document>(
  "user_role_permission",
  userRolePermissionSchema,
);
