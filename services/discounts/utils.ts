import { ENameDiscount } from "./interface";

function generateDiscountCode(name: ENameDiscount): string {
  const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();

  const randomValue = Math.floor(Math.random() * 101);

  const uniqueCode = `${name.toUpperCase()}${randomChars}${randomValue}`;

  return uniqueCode;
}

export { generateDiscountCode };

