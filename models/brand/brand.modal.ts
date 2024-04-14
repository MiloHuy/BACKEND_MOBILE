import { model } from "mongoose";
import { brandSchema } from "./schema";

export const ModalBrand = model("brands", brandSchema);
