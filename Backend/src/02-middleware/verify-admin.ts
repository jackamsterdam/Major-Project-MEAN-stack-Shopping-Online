import { NextFunction, Request, Response } from "express";
import ErrorModel from "../03-models/error-model";
import RoleEnum from "../03-models/role-enum";
import cyber from "./cyber";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authorizationHeader = request.header('authorization')

  const isValid = await cyber.verifyToken(authorizationHeader)
  if (!isValid) {
    next(new ErrorModel(401, 'You are not logged in'))
    return
  }


  const user = cyber.getUserFromToken(authorizationHeader)
  if (user.role !== RoleEnum.Admin) {
    next(new ErrorModel(403, `Forbidden: You are not authorized`))
    return
  }

  next()
}

export default verifyAdmin