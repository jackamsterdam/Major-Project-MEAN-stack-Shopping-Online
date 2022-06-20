import { UserModel } from "./user.model"

export class CartModel {
    _id: string 
    
    isClosed: boolean  //! should i default to false??
    createdAt: Date ///! נכון צריך להוסיף????

    userId: string 
    user: UserModel
}

