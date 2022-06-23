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

//We need for opening page to get the users last order 
//!pay attention user can have many orders in past we need the most recent one!!! 
//http://localhost:3001/api/recent-order-by-user/62ab04da04e42a63f933a30b
router.get('/recent-order-by-user/:userId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId
        const order = await ordersLogic.getMostRecentOrder(userId)
        response.json(order)
    } catch (err: any) {
        next(err)
    }
})

//For final receipt:
//http://localhost:3001/api/receipts/2352423342
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

// Count: 
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