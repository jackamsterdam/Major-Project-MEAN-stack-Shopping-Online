import express, { NextFunction, Request, Response } from 'express'
import { OrderModel } from '../03-models/order-model'
import ordersLogic from '../05-logic/orders-logic'
//!Add verify logged in and verify admin
const router = express.Router()

//http://localhost:3001/api/orders/
router.post('/orders', async (request: Request, response: Response, next: NextFunction) => {
    try {
      
        const order = new OrderModel(request.body)
        const addedOrder = await ordersLogic.addOrder(order)
        response.status(201).json(addedOrder)

    } catch (err: any) {
        next(err)
    }
})


export default router 