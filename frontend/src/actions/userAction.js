import Axios from "axios";
import Cookie from "js-cookie";
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
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

const signin = (email, password) => async dispatch => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("https://e-commerce-website-one-tan.vercel.app/api/users/signin", {
            email,
            password
        });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
};

const register = (name, email, phoneNumber, password) => async dispatch => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, phoneNumber, password }
    });
    try {
        const { data } = await Axios.post("/api/users/register", {
            name,
            email, 
            phoneNumber,
            password
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
};

const logout = () => async dispatch => {
    dispatch({type: USER_LOGOUT_REQUEST})
    try{
        await Axios.get("/api/users/logout",{});
        Cookie.remove("userInfo"); 
        window.location.href = "/"; 
        dispatch({type: USER_LOGOUT_SUCCESS})
    }catch (error) {
        dispatch({type: USER_LOGOUT_FAIL, payload: error.message});
    }
};

const loginWithGoogle = (googleToken) => async dispatch => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await Axios.post("/api/users/google-login", { token: googleToken });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
};

const listUsers = () => async dispatch => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const { data } = await Axios.get("/api/users/list-user");
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
};

const saveUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_SAVE_REQUEST });
        const { data } = user._id
            ? await Axios.put(`/api/users/${user._id}`, user)
            : await Axios.post('/api/users', user);
        dispatch({ type: USER_SAVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_SAVE_FAIL, payload: error.message });
    }
};

const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        await Axios.delete(`/api/users/${userId}`);
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
};

export { signin, register, logout, loginWithGoogle, listUsers, saveUser, deleteUser };
