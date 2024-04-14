import { Document, model } from "mongoose";
import { ICommentSchema } from "./inteface";
import { commentSchema } from "./schema";

export const ModelComment = model<ICommentSchema & Document>('comments', commentSchema); 