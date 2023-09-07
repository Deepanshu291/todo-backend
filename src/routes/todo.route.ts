import { Router } from "express";
import { addTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todo.controller";

export const todoRouter = Router()

todoRouter.route("/").get(getTodo)
todoRouter.route("/").post(addTodo)
todoRouter.route("/:id").put(updateTodo)
todoRouter.route("/:id").delete(deleteTodo)
todoRouter.route("/:id").patch(getTodoById)