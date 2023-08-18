import express, { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import ValidateErrors from "../exception/Validaterrors.exception";

const errorMiddleware = (error : Error, req:Request ,res:Response, next:NextFunction)=>{
    try{
        console.log(error.stack);
        if (error instanceof ValidateErrors){
            res.status(error.status).send({message : error.message , error :error.ValidatedError(error.errors)});
        }
        if (error instanceof HttpException){
        res.status(error.status).send({ error : error.message});
        return;
    }
    else{
        res.status(500).send(error.message)
    }
    
}
catch(err){
    next(err)
}
    }

    export default errorMiddleware;