import { Document, model } from "mongoose";
import { ICommentSchema } from "./inteface";
import { commentSchema } from "./schema";

export const nameModelComment = 'comments';
export const ModelComment = model<ICommentSchema & Document>(nameModelComment, commentSchema); 