import cyber from '../02-middleware/cyber';
import ErrorModel from '../03-models/error-model';
import { ICredentialsModel } from './../03-models/credentials-model';
import { IUserModel, UserModel } from './../03-models/user-model';


async function checkValidEmailAndSSN(user: IUserModel):Promise<boolean> {
    //Prevent duplicate username with specific message instead of  using unique in mongoose with a less pleasant message: 
    const existsUsername = await UserModel.findOne({ username: user.username }).exec()
    // if (existsUsername) throw new ErrorModel(400, `Username ${user.username} is already taken. Please make sure that you are not registered already or please choose a different username`)
    if (existsUsername) return false


    // Hash and salt social security nubmer before comparing in query 
    const hashedSocialtoCheck = cyber.hash(user.socialSecurityNumber)
    // console.log("user.socialSecurityNumber after hash", hashedSocialtoCheck);

    //Prevent duplicate social security number (American teudat zehut) with specific message instead of  using unique in mongoose with a less pleasant message: 
    const existsSocialSecurityNumber = await UserModel.findOne({socialSecurityNumber: hashedSocialtoCheck}).exec()
    // if (existsSocialSecurityNumber) throw new ErrorModel(400, `Social Security Number you have entered already exists. Please make sure that you are not registered already or please try again`)
    if (existsSocialSecurityNumber) return false
    //Social Security Number 123-93-1238 already exists. Please make sure that you are not registered already or please try  - better not to return the social back to him with message for security purposes.

    //Return true if both social security number and email are unique
    return true
}

async function register(user: IUserModel): Promise<string> {
    //Validation
    const errors = user.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    //!נכון זה חכם לעשות לשכפל את הפונציקות פה כי אם משהו גולש ישיורת לפנ שיעצור אותו 
    // re-wrote email and ssn functions to check if unique in order to prevent 500 errors in front end if front surfs stright to register: See above for explanation of these function:
    //***** */ 
    const existsUsername = await UserModel.findOne({ username: user.username }).exec()
    if (existsUsername) throw new ErrorModel(400, `Username ${user.username} is already taken. Please make sure that you are not registered already or please choose a different username`)
    const hashedSocialtoCheck = cyber.hash(user.socialSecurityNumber)
    const existsSocialSecurityNumber = await UserModel.findOne({socialSecurityNumber: hashedSocialtoCheck}).exec()
    if (existsSocialSecurityNumber) throw new ErrorModel(400, `Social Security Number you have entered already exists. Please make sure that you are not registered already or please try again`)
   //***** */ 


    //No need for uuid because mongoDB supplies ObjectId so solved IDOR attack problems
    //No need to assign user.role because assigned by default in mongoose

    //Hash and salt passwords:
    user.password = cyber.hash(user.password)

    //Hash and salt social security number because it is also sensitive data
    user.socialSecurityNumber = cyber.hash(user.socialSecurityNumber)

    await user.save()
    

    //We dont want to return password or social security id back to user in token becasue they are sensitive information.
    user.password = undefined 
    user.socialSecurityNumber = undefined

    //Get new token
    const token = cyber.getNewToken(user)
    // console.log("token", token);
    // const token = cyber.getNewToken({firstName: user.firstName, lastName: user.lastName, username: user.username,street:  user.street, city: user.city,role:  user.role, _id: user._id, socialSecurityNumber: undefined, password: undefined})

    return token

}

async function login(credentials: ICredentialsModel): Promise<string> {
    // Validation 
    const errors = credentials.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    // Hash and salt password before comparing in query 
    credentials.password = cyber.hash(credentials.password)
    //Also works: and then you can delete prop password const user = await UserModel.findOne({username: credentials.username, password: credentials.password}).lean().exec()
    const users = await UserModel.find({ username: credentials.username, password: credentials.password }, { password: 0, socialSecurityNumber: 0 }).exec()
    const user = users[0]
    if (!user) throw new ErrorModel(401, `Incorrect username or password`)

    //Get new token (without password and without social security number)
    const token = cyber.getNewToken(user)
    
    return token

}
// delete comment later: 
// To use delete you would need to convert the model document into a plain JavaScript object by calling toObject so that you can freely manipulate it:

// user = user.toObject();
// delete user.salt;
// delete user.pass;

export default {
    register,
    login,
    checkValidEmailAndSSN
}