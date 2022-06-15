// //! import ProductModel from '../models/product.model'

// //Products State - products data neeed in the application level:
// export class ProductsState {
//     products: ProductModel[] = []
// }

// //Products Action Type -any action which can be done on the above proudcts state
// export enum ProductsActionType {
//     FetchProducts = 'FetchProducts',
//     AddProduct = 'AddProduct',
//     UpdateProduct = 'UpdateProduct',
//     DeleteProduct = 'DeleteProduct'
// }

// //Products Action - any single object sent to the store during 'dispatch':
// export interface ProductsAction {
//     type: ProductsActionType
//     payload: any
// }

// //Products Action Creators - function for creating ProdctsAction objects. Each function creates an Action object:
// export function fetchProductsAction(products: ProductModel[]): ProductsAction {
//     return {type: ProductsActionType.FetchProducts, payload: products}
// }

// export function addProductAction(product: ProductModel): ProductsAction {
//     return {type: ProductsActionType.AddProduct, payload: product }
// }

// export function updateProductAction(product: ProductModel): ProductsAction {
//     return {type: ProductsActionType.UpdateProduct, payload: product}
// }

// //!id: string???
// export function deleteProductAction(_id: string):ProductsAction {
//     return {type: ProductsActionType.DeleteProduct, payload: _id}
// }

// //Products Reducer - the main function performing any action on products state:
// //the new ProductsState() is a default value for the first time only 
// export function productsReducer(currentState: new ProductsState(), action: ProductsAction): ProductsState {
//     const newState = {...currentState}

//     switch (action.type) {
//         case ProductsActionType.FetchProducts:
//         newState.products = action.payload
//         break;
//         case ProductsActionType.AddProduct:
//         newState.products.push(action.payload)
//         break;
//         case ProductsActionType.UpdateProduct:
//         const indexToUpdate = newState.products.findIndex(p => p.id === action.payload._id)  //!_id
//         if (indexToUpdate >= 0) {
//             newState.products[indexToUpdate] = action.payload 
//         }
//         break;
//         case ProductsActionType.DeleteProduct:
//         const indexToDelete = newState.products.findIndex(p => p.id === action.payload)
//         if (indexToDelete >= 0) {
//             newState.products.splice(indexToDelete, 1)
//         }
//         break;
//     }
//     return newState
// }
