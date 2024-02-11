"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninValidation = exports.TodoValidation = exports.Uservalidation = void 0;
const validator_1 = __importDefault(require("./validator"));
const validationSchema_1 = require("./validationSchema");
const Uservalidation = (req, res, next) => {
    (0, validator_1.default)(validationSchema_1.userSchema, req.body, next);
};
exports.Uservalidation = Uservalidation;
const TodoValidation = (req, res, next) => {
    (0, validator_1.default)(validationSchema_1.todoSchema, req.body, next);
};
exports.TodoValidation = TodoValidation;
const SigninValidation = (req, res, next) => {
    (0, validator_1.default)(validationSchema_1.SiginSchema, req.body, next);
};
exports.SigninValidation = SigninValidation;
