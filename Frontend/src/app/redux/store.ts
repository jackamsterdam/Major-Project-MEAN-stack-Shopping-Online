import { authReducer } from './auth-state';
import { combineReducers, createStore } from "redux";
import { categoriesReducer } from "./categories-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({
    productsState: productsReducer,
    categoriesState: categoriesReducer,
    authState: authReducer
})

const store = createStore(reducers)
export default store 