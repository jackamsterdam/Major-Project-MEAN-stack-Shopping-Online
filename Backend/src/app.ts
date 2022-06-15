import dotenv from 'dotenv'
dotenv.config() 
import config from './01-utils/config'

import express, { NextFunction, Request, Response } from 'express'

import dal from './04-dal/dal'
dal.connect()

import cors from 'cors'
import expressRateLimit from 'express-rate-limit'
import expressFileUpload from 'express-fileupload'
import errorsHandler from './02-middleware/errors-handler'
import ErrorModel from './03-models/error-model'
import logRequests from './02-middleware/log-requests'
import sanitize from './02-middleware/sanitize'
import controller from './06-controllers/controllers'


const server = express()

if (config.isDevelopment) {
    server.use(cors({ origin: ['http://localhost:3001', 'http://localhost:4200'] }))
}

server.use('/', expressRateLimit({ windowMs: 1000, max: 10, message: "Rate exceeded. Please try again soon" }))

server.use(express.json())
server.use(expressFileUpload())
server.use(logRequests)
server.use(sanitize)

server.use('/api', controller)

server.use('*', (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, `Route not found`))
})

server.use(errorsHandler)

server.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}...`))