export interface IRequestGetAllCommentByProductId {
  params: {
    productId: string;
  }
}

export interface IRequestCreateComment {
  body: {
    userId: string;
    productId: string;
    content: string;
    discountId: string;
    rateComment: number;
  }
}