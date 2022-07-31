import express, { NextFunction, Request, Response } from "express";
import path from 'path'
const router = express.Router() 

//Image route:
//http://localhost:3001/shopping/images/2025c68f-5f20-49bb-b578-cc700764dcfb.jpg
router.get('/shopping/images/:imageName', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName 
        const absolutePath = path.join(__dirname, '..', 'upload', 'images', imageName)
        response.sendFile(absolutePath)
    } catch (err: any) {
        next(err)
    }
})

export default router 