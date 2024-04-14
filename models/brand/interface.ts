import { Document } from "mongoose";

export interface IBrandSchema extends Document {
  brandName: string;
  brandImg: string;
  brandAddress: string,
  brandRate: number;
  description: string;
}
