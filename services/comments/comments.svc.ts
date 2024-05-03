import { EApiStatus } from "../../constanst/api.const";
import { ECode, EMessage } from "../../constanst/code-mess.const";
import { ModelComment } from "../../models/comments/comment.modal";
import { IRequestCreateComment, IRequestGetAllCommentByProductId } from "./interface";

const getAllCommentByProductId = async (productId: IRequestGetAllCommentByProductId['params']): Promise<Record<string, unknown> | null> => {
  try {
    return await ModelComment.findOne({ productId });
  } catch (error) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    };
  }
}

const createComment = async (
  {
    userId,
    productId,
    content,
    discountId,
    rateComment
  }: IRequestCreateComment['body']
): Promise<any> => {
  try {
    return await ModelComment.create({ userId, productId, content, discountId, rateComment });
  } catch (error) {
    return {
      status: EApiStatus.Error,
      code: ECode.MONGO_SERVER_ERROR,
      message: EMessage.MONGO_SERVER_ERROR
    };
  }
}

export { createComment, getAllCommentByProductId };

