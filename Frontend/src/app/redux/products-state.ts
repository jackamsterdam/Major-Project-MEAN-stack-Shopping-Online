import { ProductModel } from "../models/product.model";

//Products State - products data needed in the application level: 
export class ProductsState {
    products: ProductModel[] = []
    searchText: string = '';

}

//Products Action Type -any action which can be done on the above prouducts state
export enum ProductsActionType {
    FetchProducts = 'FetchProducts',
    AddProduct = 'AddProduct',
    UpdateProduct = 'UpdateProduct',
    SearchText = 'SearchText',
}

//Products Action - any single object sent to the store during 'dispatch':
export interface ProductsAction {
    type: ProductsActionType
    payload: any  
}


//Products Action Creators - function for creating ProdctsAction objects. Each function creates an Action object: 
//Admin and user both fetch all products
export function fetchProductsAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.FetchProducts, payload: products }
}
export function addProductAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.AddProduct, payload: product }
}

export function updateProductAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.UpdateProduct, payload: product }
}

export function searchTextProductAction(text: string): ProductsAction {
    return { type: ProductsActionType.SearchText, payload: text }
}

// Products Reducer - the main function performing any action on products state:
// the new ProductsState() is a default value for the first time only 
export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState }

    switch (action.type) {
        case ProductsActionType.FetchProducts:
            newState.products = action.payload

            break;
        case ProductsActionType.AddProduct:
            newState.products.push(action.payload)

            break;
        case ProductsActionType.UpdateProduct:
            const indexToUpdate = newState.products.findIndex(p => p._id === action.payload._id) 
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload
            }
            break;
        case ProductsActionType.SearchText:
            newState.searchText = action.payload
            break;
    }

    return newState
}