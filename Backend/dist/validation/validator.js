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
const zod_1 = require("zod");
const http_errors_1 = __importDefault(require("http-errors"));
const validator = (Schema, body, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield Schema.safeParse(body);
        if (value.success) {
            return next();
        }
        next((0, http_errors_1.default)(400, "format incorrect"));
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next((0, http_errors_1.default)(400, "validation error", {
                detail: error.errors,
            }));
        }
        return next((0, http_errors_1.default)(500, "internal server errror"));
    }
});
exports.default = validator;
