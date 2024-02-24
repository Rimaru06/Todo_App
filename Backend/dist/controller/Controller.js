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
exports.MarkedDoneTodo = exports.deleteTodo = exports.getaTodoByID = exports.getAllTodoCompleted = exports.getAllTodo = exports.addTodo = exports.signinUser = exports.signupUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    try {
        const existingUser = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            next((0, http_errors_1.default)(422, "Email already exists"));
        }
        const hassedPass = yield bcrypt_1.default.hash(password, 8);
        const user = yield prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hassedPass,
            },
        });
        res.status(200).json({
            message: "User Created",
            user,
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "sigup Failed"));
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userexist = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!userexist)
            return res.status(404).json({ message: "user not found" });
        const isValidPass = yield bcrypt_1.default.compare(password, userexist.password);
        if (!isValidPass)
            next((0, http_errors_1.default)(401, "passowrd not valid"));
        const token = jsonwebtoken_1.default.sign({
            userId: userexist.id,
        }, config_1.JWT_KEY, {
            expiresIn: "7d",
        });
        res.json({
            userinfo: {
                email: userexist.email,
                firstName: userexist.firstName,
                lastName: userexist.lastName,
            },
            token,
        });
    }
    catch (error) {
        next((0, http_errors_1.default)(401, "sigin Failed"));
    }
});
exports.signinUser = signinUser;
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    try {
        const Todo = yield prisma.todo.create({
            data: {
                userId: parseInt(userId.userId),
                title: title,
                description: description,
            },
        });
        res.status(200).json({
            message: "Todo Created",
            Todo,
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "Todo Creation Failed"));
    }
});
exports.addTodo = addTodo;
const getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const alltodo = yield prisma.todo.findMany({
            where: {
                userId: parseInt(userId.userId),
                done: false,
            },
            select: {
                id: true,
                title: true,
                done: true,
                description: true,
            },
        });
        res.json({
            alltodo,
        });
    }
    catch (error) {
        next((0, http_errors_1.default)(401, "user not found"));
    }
});
exports.getAllTodo = getAllTodo;
const getAllTodoCompleted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const alltodo = yield prisma.todo.findMany({
            where: {
                userId: parseInt(userId.userId),
                done: true,
            },
            select: {
                id: true,
                title: true,
                done: true,
                description: true,
            },
        });
        if (alltodo.length === 0) {
            return res.status(404).json({ messgae: "No Completed todo found" });
        }
        res.json({
            alltodo,
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "user not found"));
    }
});
exports.getAllTodoCompleted = getAllTodoCompleted;
const getaTodoByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const todoId = req.query.todoId;
        const todo = yield prisma.todo.findFirst({
            where: {
                id: parseInt(todoId),
                userId: parseInt(userId.userId),
            },
            select: {
                id: true,
                title: true,
                description: true,
                done: true,
            },
        });
        res.json({
            todo,
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "user not found"));
    }
});
exports.getaTodoByID = getaTodoByID;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const todoId = req.query.todoId;
        const dele = yield prisma.todo.deleteMany({
            where: {
                id: parseInt(todoId),
                userId: parseInt(userId.userId),
            },
        });
        if (dele.count == 0) {
            next((0, http_errors_1.default)(404, "Todo id not found"));
        }
        res.json({
            message: "deleted success",
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "deletion unsuccessfull"));
    }
});
exports.deleteTodo = deleteTodo;
const MarkedDoneTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const todoId = req.query.todoId;
        const update = yield prisma.todo.update({
            where: {
                userId: parseInt(userId.userId),
                id: parseInt(todoId),
            },
            data: {
                done: true,
            },
        });
        console.log(update);
        res.status(200).json({
            message: "todo updated succesfull",
        });
    }
    catch (error) {
        console.log(error);
        next((0, http_errors_1.default)(401, "updation  unsuccessfull"));
    }
});
exports.MarkedDoneTodo = MarkedDoneTodo;
