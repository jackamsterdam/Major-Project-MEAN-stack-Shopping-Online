import express, { NextFunction, Request, Response } from 'express'
import verifyLoggedIn from '../02-middleware/verify-logged-in';
import { CartItemModel } from '../03-models/cart-item-model';
import cartItemsLogic from '../05-logic/cart-items-logic';

const router = express.Router()

//When user re-logs in his cart items are displayed
//http://localhost:3001/api/items-by-cart/62969ee1c05d55310aba99b2
router.get('/items-by-cart/:cartId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId
        const items = await cartItemsLogic.getAllItemsByCart(cartId);
        response.json(items)

    } catch (err: any) {
        next(err)
    }
})

//Adding new item to cart with cart sent in body but sending userId as well in url
//http://localhost:3001/api/items/62ab04da04e42a63f933a30b
router.post('/items/:userId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const userId = request.params.userId
        const item = new CartItemModel(request.body)

        const addedItem = await cartItemsLogic.addItem(item, userId)
        response.status(201).json(addedItem)

    } catch (err: any) {
        next(err)
    }
})


// Delete one item in specific cart
//http://localhost:3001/api/items/:_id/cartId
router.delete('/items/:_id/:cartId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        const cartId = request.params.cartId
        await cartItemsLogic.deleteItem(_id, cartId)
        response.sendStatus(204)

    } catch (err: any) {
        next(err)
    }
})

// Delete All items in specific cart
//http://localhost:3001/api/cartId
router.delete('/items/:cartId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const cartId = request.params.cartId
        await cartItemsLogic.deleteAllItemsByCart(cartId)
        response.sendStatus(204)

    } catch (err: any) {
        next(err)
    }
})

export default router 