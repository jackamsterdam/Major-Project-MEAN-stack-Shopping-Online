import express, { NextFunction, Request, Response } from 'express'
import cartsLogic from '../05-logic/carts-logic'
import verifyLoggedIn from '../02-middleware/verify-logged-in'

const router = express.Router()

//Gets only cart by user that is open
//http://localhost:3001/api/cart-by-user/62969ee1c05d55310aba99b2
router.get('/cart-by-user/:userId/', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId
        //We want the cart that is open (isClosed===false)
        const cart = await cartsLogic.getCartByUser(userId, false)
        response.json(cart)

    } catch (err: any) {
        next(err)
    }
})

export default router 