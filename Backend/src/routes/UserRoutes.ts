import { Router } from "express";
import { addTodo, signinUser, signupUser,getAllTodo,getaTodoByID, deleteTodo , getAllTodoCompleted, MarkedDoneTodo} from "../controller/Controller";
import { SigninValidation, Uservalidation } from "../validation/Uservalidation";
import { jwtVerify } from "../middleware/jwtverify";

const router = Router();


router.post('/signup', Uservalidation , signupUser );
router.post('/signin',SigninValidation, signinUser);
router.post("/addTodo", jwtVerify , addTodo);
router.get('/getTodos', jwtVerify, getAllTodo);
router.get('/CompletedTodos', jwtVerify , getAllTodoCompleted);
router.get('/gitTodoById', jwtVerify , getaTodoByID);
router.put('/delteTodo', jwtVerify , deleteTodo);
router.put('/markedDone',jwtVerify ,MarkedDoneTodo );


export default router;