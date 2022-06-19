import cyber from '../02-middleware/cyber';
import ErrorModel from '../03-models/error-model';
import { ICredentialsModel } from './../03-models/credentials-model';
import { IUserModel, UserModel } from './../03-models/user-model';

async function register(user: IUserModel): Promise<string> {
    //Validation
    const errors = user.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    //Prevent duplicate username with specific message instead of  using unique in mongoose with a less pleasant message: 
    const existUsername = await UserModel.findOne({ username: user.username }).exec()
    if (existUsername) throw new ErrorModel(400, `Username ${user.username} is already taken. Please choose a different username`)

    //No need for uuid because mongoDB supplies ObjectId so solved IDOR attack problems
    //No need to assign user.role because assigned by default in mongoose

    //Hash and salt passwords:
    user.password = cyber.hash(user.password)

    await user.save()

    delete user.password

    //Get new token
    const token = cyber.getNewToken(user)

    return token

}

async function login(credentials: ICredentialsModel): Promise<string> {
    // Validation 
    const errors = credentials.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    // Hash and salt password before comparing in query 
    credentials.password = cyber.hash(credentials.password)
    //Also works: and then you can delete prop password const user = await UserModel.findOne({username: credentials.username, password: credentials.password}).lean().exec()
    const users = await UserModel.find({ username: credentials.username, password: credentials.password }, { password: 0 }).exec()
    const user = users[0]
    if (!user) throw new ErrorModel(401, `Incorrect username or password`)

    //Get new token
    const token = cyber.getNewToken(user)
    
    return token

}


export default {
    register,
    login
}