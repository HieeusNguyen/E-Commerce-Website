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
    USER_LOGOUT_SUCCESS
} from "../constants/userConstants";

const signin = (email, password) => async dispatch => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/users/signin", {
            email,
            password
        });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
};
const register = (name, email, password) => async dispatch => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password }
    });
    try {
        const { data } = await Axios.post("/api/users/register", {
            name,
            email,
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

export { signin, register, logout };
