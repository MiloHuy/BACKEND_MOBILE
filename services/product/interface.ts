
export interface IRequestCreateProduct {
  query: {
    productName: string;
    productImg: string;
    price: number;
    size: string;
    rate: number;
    description: string;
    brand: string;
    category: string;
    quantity: number;
  }
}
