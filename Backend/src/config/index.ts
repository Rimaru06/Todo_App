import dotenv from 'dotenv'
dotenv.config();
export const PORT = parseInt(process.env.PORT!)
export const JWT_KEY = process.env.JWT_KEY!
