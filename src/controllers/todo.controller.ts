import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo.model";
import { CustomError } from "../utils/helpers/error.helper";
import { StatusCodes } from "http-status-codes";
import { Itodos } from "../../@types/todo.model";

export const getTodo = async (req: Request, res: Response) => {
    
        const todos = await TodoModel.find<Itodos>();
        res.json(todos);
    
}

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const todo = await TodoModel.findById<Itodos>(id);
        const updatedTodo = await TodoModel.findByIdAndUpdate<Itodos>(
            id,
            { $set: { IsDone: !todo?.IsDone } },
            { new: true }
        );

        res.status(StatusCodes.ACCEPTED).json(updatedTodo);
    } catch (error) {
        next(error);
    }
}

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


export const deleteTodo = async (req: Request, res: Response,next:NextFunction) => {
    const id = req.params.id;

    try {
        const todo = await TodoModel.findByIdAndDelete(id);
        res.status(StatusCodes.ACCEPTED).json(todo);
    } catch (error) {
        next(error);
    }
}
