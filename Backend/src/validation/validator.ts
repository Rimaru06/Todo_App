import zod, { ZodError} from 'zod';
import { NextFunction } from 'express';
import createHttpError from 'http-errors';


 const validator = async (Schema : zod.ZodObject<any,any,any> ,body : object , next : NextFunction) => {
    try {
        const value = await Schema.safeParse(body);
        if (value.success) {
           return  next();
        }
        next(createHttpError(400, "format incorrect"))


    } catch (error) {
        if (error instanceof ZodError) {
            return next(createHttpError(400, "validation error", {
                detail: error.errors,
            }))
        }

        return next(createHttpError(500, "internal server errror"))
    }
}

export default validator;
