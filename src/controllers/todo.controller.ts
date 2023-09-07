import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo.model";
import { CustomError } from "../utils/helpers/error.helper";
import { StatusCodes } from "http-status-codes";
import { Itodos } from "../../@types/todo.model";

// Get all todos
export const getTodo = async (req: Request, res: Response) => {
    
        const todos = await TodoModel.find<Itodos>();
        res.json(todos);
    
}

// Get todo by id and toggle Isdone field
export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const todo = await TodoModel.findById<Itodos>(id);

        if (!todo) {
            throw new CustomError({
                message: "Todo not found",
                statusCode: StatusCodes.NOT_FOUND,
            });
        }

        const updatedTodo = await TodoModel.findByIdAndUpdate<Itodos>(
            id,
            { $set: { Isdone: !todo.IsDone } },
            { new: true }
        );

        res.status(StatusCodes.ACCEPTED).json(updatedTodo);
    } catch (error) {
        next(error);
    }
}

// Add new todo controller
export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todo = new TodoModel<Itodos>(req.body);

    try {
        await todo.save();
        res.status(StatusCodes.CREATED).json({
            message: "Todo created successfully",
        });
    } catch (error) {
         next(error);
    }
}

// Update todo controller
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { todo } = req.body;

    try {
        const todoupdate = await TodoModel.findByIdAndUpdate(
            id,
            { $set: { todo: todo } },
            { new: true }
        );

        res.status(StatusCodes.ACCEPTED).json(todoupdate);
    } catch (error) {
        next(error);
    }
}

// Delete todo controller
export const deleteTodo = async (req: Request, res: Response,next:NextFunction) => {
    const id = req.params.id;

    try {
        const todo = await TodoModel.findByIdAndDelete(id);
        res.status(StatusCodes.ACCEPTED).json(todo);
    } catch (error) {
        next(error);
    }
}
