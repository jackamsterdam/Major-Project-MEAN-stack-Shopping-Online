import express, { NextFunction, Request, Response } from 'express'
import { OrderModel } from '../03-models/order-model'
import ordersLogic from '../05-logic/orders-logic'
import cartItemsLogic from '../05-logic/cart-items-logic'
//!Add verify logged in and verify admin
const router = express.Router()

//Add order
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

//! Delete this - for testing purposes only: 
//http://localhost:3001/api/orders/
router.get('/orders', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await ordersLogic.getOrders()
        response.json(orders)
    } catch (err: any) {
        next(err)
    }
})

//For final receipt:
router.get('/receipts/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orderId = request.params._id
        const order = await ordersLogic.getReceiptById(orderId)
        const items = await cartItemsLogic.getAllItemsByCart(order.cartId.toString());
        const reciept = {
            order,
            items
        }
        response.json(reciept)
    } catch (err: any) {
        next(err)
    }
})


export default router 