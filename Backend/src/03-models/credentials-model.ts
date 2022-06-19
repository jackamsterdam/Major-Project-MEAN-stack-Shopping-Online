import { Document, model, Schema } from "mongoose";


//1. Model interface describing the data in the model:
export interface ICredentialsModel extends Document {

    username: string
    password: string
   
}

//2. Model Schema describing validation, constraints and more:
const CredentialsSchema = new Schema<ICredentialsModel>({
   
    username: {
        type: String,
        unique:  true,  //! see what message it givesyou!!!!!!!!!!!!!!!!!!!!! or else use function instead
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        trim: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "You have entered an invalid email address"]  //!make sure you have fronside validation casue front needs to block casuse you get this message: CredentialsModel validation failed: username: You have entered an invalid email address and thats not so nice ... only the username already exists in register should come from  backend and i made that nice already 
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "Password too short"],
        maxlength: [100, "Password too long"],
        trim: true,
    }
}, {
    versionKey: false,
})


//3. Model Class - this is the final model class:
export const CredentialsModel = model<ICredentialsModel>('CredentialsModel', CredentialsSchema, 'users')  ///!users not credentials right????