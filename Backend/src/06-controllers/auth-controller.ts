import express, { NextFunction, Request, Response } from 'express'
import { CredentialsModel } from '../03-models/credentials-model'
import { UserModel } from '../03-models/user-model'
import authLogic from '../05-logic/auth-logic'
//!Add verify logged in and verify admin
const router = express.Router()


//http://localhost:3001/api/auth/register
router.post('/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
       const token =  await authLogic.register(user)
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