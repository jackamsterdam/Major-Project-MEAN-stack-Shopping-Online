import { authReducer } from './auth-state';
import { combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categories-state";
import { productsReducer } from "./products-state";
import { ordersReducer } from './orders-state';
import { cartsReducer } from './carts-state';

// import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    productsState: productsReducer,
    categoriesState: categoriesReducer,
    authState: authReducer,
    ordersState: ordersReducer,
    cartsState: cartsReducer
})


const store = createStore(reducers)
// const store = createStore(reducers, composeWithDevTools())
export default store 

