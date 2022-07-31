import { CityEnum } from "./city.enum"
import { RoleEnum } from "./role.enum"

export class UserModel {
    _id: string
    firstName: string
    lastName: string
    username: string
    password: string
    socialSecurityNumber: string
    street: string
    city: CityEnum  // City Enum 10 most popular cities
    role: RoleEnum  // 1 = User , 2 = Admin  Admin does not have street and city but uses same model.
}