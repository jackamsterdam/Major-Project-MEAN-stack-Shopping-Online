import express, { NextFunction, Request, Response } from 'express'
import { OrderModel } from '../03-models/order-model'
import ordersLogic from '../05-logic/orders-logic'
import verifyLoggedIn from '../02-middleware/verify-logged-in'

const router = express.Router()

// Get orders 
//http://localhost:3001/api/orders/
router.get('/orders', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await ordersLogic.getAllOrders()
        response.json(orders)
    } catch (err: any) {
        next(err)
    }
})

//Add order
//http://localhost:3001/api/orders/
router.post('/orders', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const order = new OrderModel(request.body)
        const addedOrder = await ordersLogic.addOrder(order)
        response.status(201).json(addedOrder)

    } catch (err: any) {
        next(err)
    }
})


// Count: non-users have access to this information.
//http://localhost:3001/api/orders-count/
router.get('/orders-count', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const count = await ordersLogic.countOrders()
        response.json(count)
    } catch (err: any) {
        next(err)
    }
})


export default router 