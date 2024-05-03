import { Response } from "express"
import { EApiStatus } from "../constanst/api.const"
import { ECode, EMessage } from "../constanst/code-mess.const"

export const genMessRequired = (name: string): string => {
  return `${name} không được để trống`
}

export const genMessNotValid = (name: string): string => {
  return `${name} không hợp lệ. Vui lòng thử lại.`
}

export const isDataObject = (data: any): data is Record<string, unknown> => {
  return typeof data === 'object' && data !== null;
}

export const checkDataFromDb = (data: Record<string, unknown> | null, messageNotFound: EMessage, response: Response) => {
  if (data === null) {
    return response.status(ECode.FAIL).json({
      code: ECode.NOT_FOUND,
      message: messageNotFound
    });
  }

  if (data.code && data.code === ECode.NOT_FOUND) {
    return response.status(data.code).json({
      code: data.code,
      message: data.message
    });
  }

  if (data.status && data.status === EApiStatus.Error) {
    return response.status(data.code as number).json({
      code: data.code,
      message: data.message
    });
  }
  return true
}