import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import { JWT_KEY } from "../config/index";
export const jwtVerify : RequestHandler = async (req ,res ,next)=>{
    const token = req.headers.authorization;

    if(!token) return res.status(401).json({message : "authorization token null"})

    const splittingToken = token.split(" ");
    const authToken = splittingToken[1];

    try {
      const decoded = jwt.verify(authToken, JWT_KEY);
      if (decoded) {
        req.body.userId = decoded;
      } else {
        throw new Error("User ID not found");
      }
      next();
    } catch (error : any ) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
}