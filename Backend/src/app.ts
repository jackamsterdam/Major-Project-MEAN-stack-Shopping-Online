import dotenv from 'dotenv'
dotenv.config()
import config from './01-utils/config'

import express, { NextFunction, Request, Response } from 'express'

import dal from './04-dal/dal'
dal.connect()

import expressRateLimit from 'express-rate-limit'
import expressFileUpload from 'express-fileupload'
import errorsHandler from './02-middleware/errors-handler'
import ErrorModel from './03-models/error-model'
import logRequests from './02-middleware/log-requests'
import sanitize from './02-middleware/sanitize'
import productsController from './06-controllers/products-controller'
import imagesController from './06-controllers/images-controller'
import cartsController from './06-controllers/carts-controller'
import cartItemsController from './06-controllers/cart-items-controller'
import ordersController from './06-controllers/orders-controller'
import authController from './06-controllers/auth-controller'
import path from 'path'
const server = express()

server.use(express.static('public'));
server.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
})


server.use('/api', expressRateLimit({ windowMs: 1000, max: 10, message: "Rate exceeded. Please try again soon" }))

server.use(express.json())
server.use(expressFileUpload())
server.use(logRequests)
server.use(sanitize)

server.use('/api', productsController)
server.use('/', imagesController)
server.use('/api', cartsController)
server.use('/api', cartItemsController)
server.use('/api', ordersController)
server.use('/api/auth', authController)


server.use(errorsHandler)
const port = process.env.PORT || 8080
server.listen(port, () => console.log(`Listening on PORT ${port}...`))