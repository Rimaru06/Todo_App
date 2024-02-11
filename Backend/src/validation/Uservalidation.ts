import { RequestHandler } from "express";
import validator from "./validator";
import { userSchema, todoSchema, SiginSchema } from "./validationSchema";

export const Uservalidation : RequestHandler = (req,res,next) => {
    validator(userSchema,req.body,next);
}
export const  TodoValidation : RequestHandler = (req,res,next) => {
    validator(todoSchema,req.body,next);
}
export const SigninValidation : RequestHandler = (req,res,next) => {
    validator(SiginSchema , req.body , next)
}

