import express, { NextFunction, Request, Response } from 'express'
import cartsLogic from '../05-logic/carts-logic'
import { CartModel } from '../03-models/cart-model'
//!Add verify logged in and verify admin

const router = express.Router()


//!delte this as well no need to get all carts 
//http://localhost:3001/api/carts/
router.get('/carts', async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('hi')
        const carts = await cartsLogic.getAllCarts()
        response.json(carts)
    } catch (err: any) {
        next(err)
    }
})

//!NO NEED FOR THIS we adding cart only through added item !!
//http://localhost:3001/api/carts/
router.post('/carts', async (request: Request, response: Response, next: NextFunction) => {
    try {
      
        const cart = new CartModel(request.body)
        const addedCart = await cartsLogic.addCart(cart)
        response.status(201).json(addedCart)

    } catch (err: any) {
        next(err)
    }
})

//Gets only cart by user that is open!
//http://localhost:3001/api/cart-by-user/62969ee1c05d55310aba99b2
router.get('/cart-by-user/:userId/', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId
        //W want the cart that is open (isclosed===false)
        const cart = await cartsLogic.getCartByUser(userId, false)
        response.json(cart)

    } catch (err: any) {
        next(err)
    }
})

// no delete 
// //http://localhost:3001/api/carts/:_id
// router.delete('/carts/:_id', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const _id = request.params._id
//         await cartsLogic.deleteCart(_id)
//         response.sendStatus(204)

//     } catch (err: any) {
//         next(err)
//     }
// })

export default router 