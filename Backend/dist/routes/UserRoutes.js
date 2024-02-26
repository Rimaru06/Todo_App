"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = require("../controller/Controller");
const Uservalidation_1 = require("../validation/Uservalidation");
const jwtverify_1 = require("../middleware/jwtverify");
const router = (0, express_1.Router)();
router.post('/signup', Uservalidation_1.Uservalidation, Controller_1.signupUser);
router.post('/signin', Uservalidation_1.SigninValidation, Controller_1.signinUser);
router.post("/addTodo", jwtverify_1.jwtVerify, Controller_1.addTodo);
router.get('/getTodos', jwtverify_1.jwtVerify, Controller_1.getAllTodo);
router.get('/CompletedTodos', jwtverify_1.jwtVerify, Controller_1.getAllTodoCompleted);
router.get('/gitTodoById', jwtverify_1.jwtVerify, Controller_1.getaTodoByID);
router.delete('/delteTodo', jwtverify_1.jwtVerify, Controller_1.deleteTodo);
router.put("/markedDone", jwtverify_1.jwtVerify, Controller_1.MarkedDoneTodo);
exports.default = router;
