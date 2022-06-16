import express, { NextFunction, Request, Response } from 'express'
import { ItemModel } from '../03-models/item-model';
import itemsLogic from '../05-logic/items-logic';

const router = express.Router()


// DONT NEED THIS!! 
//http://localhost:3001/api/items/ 
// router.get('/items', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const items = await itemsLogic.getAllItems()
//         response.json(items)
//     } catch (err: any) {
//         next(err)
//     }
// })




//http://localhost:3001/api/items-by-cart-with-names/62969ee1c05d55310aba99b2/289749832389h892
router.get('/items-by-cart-with-names/:cartId/:productId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = request.params.cartId
        const productId = request.params.productId
        const items = await itemsLogic.getAllItemsByCartWithProductNames(cartId, productId);
        response.json(items)

    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/items/
router.post('/items', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const item = new ItemModel(request.body)
        const addedItem = await itemsLogic.addItem(item)
        response.status(201).json(addedItem)

    } catch (err: any) {
        next(err)
    }
})



//http://localhost:3001/api/items/:_id
router.delete('/items/:_id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await itemsLogic.deleteItem(_id)
        response.sendStatus(204)

    } catch (err: any) {
        next(err)
    }
})

export default router 