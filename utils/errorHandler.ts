export default class ErrorHandler extends Error {
  status: any;
  detail: any;
  code: number;

  constructor(status: any, message: any, detail: any, code: number) {
    super(message);
    this.status = status;
    this.detail = detail;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
