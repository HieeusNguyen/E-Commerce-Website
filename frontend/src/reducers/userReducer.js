import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LIST_REQUEST,      
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_SAVE_REQUEST,      
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL,
    USER_DELETE_REQUEST,    
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
function userLogoutReducer(state = {}, action){
    switch (action.type){
        case USER_LOGOUT_REQUEST:
            return { loading: true};
        case USER_LOGOUT_SUCCESS:
            return { loading: false};
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

function userListReducer(state = { users: [], loading: false, error: null }, action) {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { ...state, loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload, error: null };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload, users: [] };
        default:
            return state;
    }
}

function userSaveReducer(state = {}, action) {
    switch (action.type) {
        case USER_SAVE_REQUEST:
            return { loading: true };
        case USER_SAVE_SUCCESS:
            return { loading: false, success: true };
        case USER_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function userDeleteReducer(state = {}, action) {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export {
    userSigninReducer,
    userRegisterReducer,
    userLogoutReducer,
    userListReducer,    
    userSaveReducer,    
    userDeleteReducer   
};
