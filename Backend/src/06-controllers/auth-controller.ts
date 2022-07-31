import express, { NextFunction, Request, Response } from 'express'
import { CredentialsModel } from '../03-models/credentials-model'
import { UserModel } from '../03-models/user-model'
import authLogic from '../05-logic/auth-logic'

const router = express.Router()

//Route that checks if SSN and email are unique
//http://localhost:3001/api/auth/ssn-email-unique
router.post('/ssn-email-unique', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = new UserModel(request.body)
    const areUnique = await authLogic.checkValidEmailAndSSN(user)
    response.status(201).json(areUnique)
  } catch (err: any) {
    next(err)
  }
})

//http://localhost:3001/api/auth/register
router.post('/register', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = new UserModel(request.body)
    const token = await authLogic.register(user)
    response.status(201).json(token)
  } catch (err: any) {
    next(err)
  }
})

//http://localhost:3001/api/auth/login
router.post('/login', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const credentials = new CredentialsModel(request.body)
    const token = await authLogic.login(credentials)
    response.json(token)

  } catch (err: any) {
    next(err)
  }
})


export default router 