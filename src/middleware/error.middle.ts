import { NextFunction, Request, Response } from "express"
import { CustomError } from "../utils/helpers/error.helper"
import { StatusCodes } from "http-status-codes"

export const notFound = (req:Request,res:Response,next:NextFunction)=>{
    
    const err =  new CustomError({
        message:`NOT FOUND ${req.originalUrl}`,
        statusCode:404
    })
    next(err)
}

export const errorHandler = (err:Error, req:Request,res:Response,next:NextFunction)=>{
    const statusCode = res.statusCode ==200?StatusCodes.INTERNAL_SERVER_ERROR:res.statusCode
    res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV === "production"?null: err.stack,
        statusCode:statusCode
    })
}