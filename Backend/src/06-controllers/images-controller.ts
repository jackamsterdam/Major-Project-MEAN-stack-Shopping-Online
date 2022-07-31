import express, { NextFunction, Request, Response } from "express";
import path from 'path'
import verifyLoggedIn from "../02-middleware/verify-logged-in";
//!Add verify logged in and verify admin
const router = express.Router() 
//!for some reason verifylogged in doesnt work in client even if logged in ??
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