import express, { NextFunction, Request, Response } from 'express'
import logic from '../05-logic/logic'

const router = express.Router()

// //http://localhost:3001/api/categories/
// router.get('/categories', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const categories = await logic.getAllCategories()
//         response.json(categories)
//     } catch (err: any) {
//         next(err)
//     }
// })

// //http://localhost:3001/api/products-by-category/62969ee1c05d55310aba99b2
// router.get('/products-by-category/:categoryId', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const categoryId = request.params.categoryId
//         const products = await logic.getProductsByCategory(categoryId)
//         response.json(products)

//     } catch (err: any) {
//         next(err)
//     }
// })

// //http://localhost:3001/api/products/
// router.post('/products', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const product = new ProductModel(request.body)
//         const addedProduct = await logic.addProduct(product)
//         response.status(201).json(addedProduct)

//     } catch (err: any) {
//         next(err)
//     }
// })

// //http://localhost:3001/api/products/:_id
// router.delete('/products/:_id', async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const _id = request.params._id
//         await logic.deleteProduct(_id)
//         response.sendStatus(204)

//     } catch (err: any) {
//         next(err)
//     }
// })

export default router 