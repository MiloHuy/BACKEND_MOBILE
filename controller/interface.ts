import { NextFunction, Request, Response } from "express";

export interface IParamHandler {
  req?: Request,
  res: Response,
  next?: NextFunction,
  error?: Error
}
