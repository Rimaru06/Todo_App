import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

const prisma = new PrismaClient();

export const signupUser: RequestHandler = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      next(createHttpError(422, "Email already exists"));
    }

    const hassedPass = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
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
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "sigup Failed"));
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userexist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userexist) return res.status(404).json({ message: "user not found" });

    const isValidPass = await bcrypt.compare(password, userexist.password);

    if (!isValidPass)
    next(createHttpError(401, "passowrd not valid"));

    const token = jwt.sign(
      {
        userId: userexist.id,
      },
      JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      userinfo: {
        email: userexist.email,
        firstName: userexist.firstName,
        lastName: userexist.lastName,
      },
      token,
    });
  } catch (error) {
    next(createHttpError(401, "sigin Failed"));
  }
};

export const addTodo: RequestHandler = async (req, res, next) => {
  const { title, description, userId } = req.body;
  try {
    const Todo = await prisma.todo.create({
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
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "Todo Creation Failed"));
  }
};

export const getAllTodo: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const alltodo = await prisma.todo.findMany({
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
  } catch (error) {
    next(createHttpError(401, "user not found"));
  }
};
export const getAllTodoCompleted: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const alltodo = await prisma.todo.findMany({
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
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "user not found"));
  }
};

export const getaTodoByID: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const todoId: string = req.query.todoId as string;
    const todo = await prisma.todo.findFirst({
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
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "user not found")); 
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const todoId: string = req.query.todoId as string;
    const dele = await prisma.todo.deleteMany({
      where: {
        id: parseInt(todoId),
        userId: parseInt(userId.userId),
      },
    });
    if (dele.count == 0) {
      next(createHttpError(404, "Todo id not found"));  
    }
    res.json({
      message: "deleted success",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "deletion unsuccessfull"));
  }
};
export const MarkedDoneTodo: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const todoId: string = req.query.todoId as string;

    const update = await prisma.todo.update({
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
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "updation  unsuccessfull"));
  }
};
