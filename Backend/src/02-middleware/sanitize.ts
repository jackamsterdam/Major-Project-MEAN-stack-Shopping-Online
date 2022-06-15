import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

function sanitize(request: Request, response: Response, next: NextFunction): void {
    for (const prop in request.body) {
        if (typeof request.body[prop] === 'string') {
            request.body[prop] = striptags(request.body[prop])
        }
    }

    next()
}


export default sanitize