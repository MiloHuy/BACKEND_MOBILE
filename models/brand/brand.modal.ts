import { model } from "mongoose";
import { brandSchema } from "./schema";

export const nameModelBrands = 'brands';
export const ModalBrand = model(nameModelBrands, brandSchema);
