import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
} from "./reducers/productReducers";
import { userSigninReducer, 
    userRegisterReducer, 
    userLogoutReducer, 
    userSaveReducer, 
    userListReducer, 
    userDeleteReducer 
} from "./reducers/userReducer";
import { invoiceListReducer, invoiceSaveReducer, invoiceDeleteReducer } from "./reducers/invoiceReducers";
import { cartReducer } from "./reducers/cartReducers";
import { checkoutReducer } from "./reducers/checkoutReducers"; 
import thunk from "redux-thunk";
import * as Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
    cart: { cartItems, shipping: {}, payment: {} },
    userSignin: { userInfo },
    checkout: { loading: false, error: null, order: null }, 
};
const reducer = combineReducers({
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userLogout: userLogoutReducer,
    userList: userListReducer,      
    userSave: userSaveReducer,      
    userDelete: userDeleteReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    checkout: checkoutReducer, 
    invoiceList: invoiceListReducer,
    invoiceSave: invoiceSaveReducer,
    invoiceDelete: invoiceDeleteReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;