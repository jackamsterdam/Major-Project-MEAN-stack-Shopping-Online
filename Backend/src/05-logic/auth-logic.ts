import cyber from '../02-middleware/cyber';
import ErrorModel from '../03-models/error-model';
import { ICredentialsModel } from './../03-models/credentials-model';
import { IUserModel, UserModel } from './../03-models/user-model';


async function checkValidEmailAndSSN(user: IUserModel): Promise<boolean> {
    //Prevent duplicate username here instead of using unique in mongoose
    const existsUsername = await UserModel.findOne({ username: user.username }).exec()

    if (existsUsername) return false

    // Hash and salt social security number before comparing in query 
    const hashedSocialtoCheck = cyber.hash(user.socialSecurityNumber)

    //Prevent duplicate social security number (American tehudat-zehut) instead of using unique in mongoose
    const existsSocialSecurityNumber = await UserModel.findOne({ socialSecurityNumber: hashedSocialtoCheck }).exec()

    if (existsSocialSecurityNumber) return false

    //Return true if both social security number and email are unique
    return true
}

async function register(user: IUserModel): Promise<string> {
    //Validation
    const errors = user.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    // Checking uniqueness and sending back specific message:
    const existsUsername = await UserModel.findOne({ username: user.username }).exec()
    if (existsUsername) throw new ErrorModel(400, `Username ${user.username} is already taken. Please make sure that you are not registered already or please choose a different username`)

    // Hash and salt social security number
    const hashedSocialtoCheck = cyber.hash(user.socialSecurityNumber)
    // Checking uniqueness and sending back specific message:
    const existsSocialSecurityNumber = await UserModel.findOne({ socialSecurityNumber: hashedSocialtoCheck }).exec()
    if (existsSocialSecurityNumber) throw new ErrorModel(400, `Social Security Number you have entered already exists. Please make sure that you are not registered already or please try again`)

    //Hash and salt passwords:
    user.password = cyber.hash(user.password)

    //Hash and salt social security number because it is also sensitive data
    user.socialSecurityNumber = cyber.hash(user.socialSecurityNumber)

    await user.save()

    //We dont want to return password or social security id back to user in token becasue these are sensitive data.
    user.password = undefined
    user.socialSecurityNumber = undefined

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

    const users = await UserModel.find({ username: credentials.username, password: credentials.password }, { password: 0, socialSecurityNumber: 0 }).exec()
    const user = users[0]
    if (!user) throw new ErrorModel(401, `Incorrect username or password`)

    //Get new token (without password and without social security number)
    const token = cyber.getNewToken(user)

    return token

}

export default {
    register,
    login,
    checkValidEmailAndSSN
}