import express, { NextFunction, Request, Response } from 'express'
import verifyAdmin from '../02-middleware/verify-admin'
import verifyLoggedIn from '../02-middleware/verify-logged-in'
import { ProductModel } from '../03-models/product-model'
import productsLogic from '../05-logic/products-logic'

const router = express.Router()

//http://localhost:3001/api/categories/
router.get('/categories', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await productsLogic.getAllCategories()
        response.json(categories)
    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/products/
router.get('/products', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts()
        response.json(products)
    } catch (err: any) {
        next(err)
    }
})

// Count:  non-users have access to this information.
//http://localhost:3001/api/products-count/
router.get('/products-count',  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const count = await productsLogic.countProducts()
        response.json(count)
    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/products/234343232432
router.get("/products/:_id", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

//http://localhost:3001/api/products/
router.post('/products', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        const product = new ProductModel(request.body)
        const addedProduct = await productsLogic.addProduct(product)
        response.status(201).json(addedProduct)

    } catch (err: any) {
        next(err)
    }
})

//http://localhost:3001/api/products/62969ee1c05d55310aba99b2
router.put('/products/:_id', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        const _id = request.params._id
        request.body._id = _id
        const product = new ProductModel(request.body)
        const updatedProduct = await productsLogic.updateProduct(product)
        response.json(updatedProduct)

    } catch (err: any) {
        next(err)
    }
})

export default router 