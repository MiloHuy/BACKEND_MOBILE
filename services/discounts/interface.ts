export enum ENameDiscount {
  SYS = 'SYS',
  USER = 'USER',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
}

export interface ICreateDiscount {
  categoryId: string
  code: string
  nameDiscount?: string
  minValue: number
  maxValue: number
}
