export interface IRequestCreateBrand {
  query: {
    brandName: string;
    brandImg: string;
    brandAddress: string,
    brandRate: number;
    description: string;
  }
}
