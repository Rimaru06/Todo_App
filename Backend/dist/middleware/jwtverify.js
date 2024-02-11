"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const jwtVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: "authorization token null" });
    const splittingToken = token.split(" ");
    const authToken = splittingToken[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, index_1.JWT_KEY);
        if (decoded) {
            req.body.userId = decoded;
        }
        else {
            throw new Error("User ID not found");
        }
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.jwtVerify = jwtVerify;
