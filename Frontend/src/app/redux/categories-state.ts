import { CategoryModel } from "../models/category.model";

export class CategoriesState {
    categories: CategoryModel[] = []
}

//Categories State - categories data needed in the application level: 
export enum CategoriesActionType { 
    FetchCategories = 'FetchCategories'
}


//Categories Action - any single object sent to the store during 'dispatch':
export interface CategoriesAction {
    type: CategoriesActionType
    payload: any //!maybe cahnge from any to something else 
}


//Categories Action Creators - function for creating CategoriesAction objects. Each function creates an Action object:  
//Admin and user both fetch all categories
export function fetchCategoriesAction(categories: CategoryModel[]):CategoriesAction {
    return {type: CategoriesActionType.FetchCategories, payload: categories}
}

// Categories Reducer - the main function performing any action on categories state:
// the new CategoriesState() is a default value for the first time only 
export function categoriesReducer(currentState = new CategoriesState(), action: CategoriesAction):CategoriesState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = {...currentState}

    switch(action.type) {
        case CategoriesActionType.FetchCategories:
            newState.categories = action.payload
        break;
       
    }

    return newState
}