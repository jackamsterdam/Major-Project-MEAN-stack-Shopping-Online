import { NextFunction, Request, Response } from "express";
import logger from "../01-utils/log-helper";

async function logRequests(request: Request, response: Response, next: NextFunction): Promise<void> {
    const msg = `${request.method} Request to ${request.originalUrl}`
    logger.info(msg)

    next()
}

export default logRequests