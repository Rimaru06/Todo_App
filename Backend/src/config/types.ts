import { Request } from "express";
export interface CustomReqest extends Request {
  Id?: number;
}