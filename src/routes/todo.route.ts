import { Router } from "express";
import { addTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todo.controller";

export const todoRouter = Router()

todoRouter.route("/").get(getTodo)
todoRouter.route("/").post(addTodo)
todoRouter.route("/").put(updateTodo)
todoRouter.route("/").delete(deleteTodo)
todoRouter.route("/").patch(getTodoById)