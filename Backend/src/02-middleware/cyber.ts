import { IUserModel } from './../03-models/user-model';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const salt = "MakeThingsGoRight"
const secretKey = 'KittensAreCute'

function hash(plainText: string): string {
    if (!plainText) return null
    const hashedText = crypto.createHmac('sha512', salt).update(plainText).digest('hex')
    return hashedText
}

function getNewToken(user: IUserModel): string {
    const payload = { user }
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' })
    return token
}

function verifyToken(authorizationHeader: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (!authorizationHeader) {
            resolve(false)
            return
        }

        // Extract the token ("Bearer given-token"):
        const token = authorizationHeader.split(' ')[1]

        if (!token) {
            resolve(false)
            return
        }

        jwt.verify(token, secretKey, err => {
            if (err) {
                resolve(false)
                return
            }
            resolve(true)
        })
    })
}

function getUserFromToken(authorizationHeader: string): IUserModel {

    const token = authorizationHeader.split(' ')[1]

    //Extract payload from the token
    const payload: any = jwt.decode(token)
    //Extract user
    const user = payload.user
    return user
}


export default {
    hash,
    getNewToken,
    verifyToken,
    getUserFromToken

}