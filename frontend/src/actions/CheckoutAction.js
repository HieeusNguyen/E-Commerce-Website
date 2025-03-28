import {
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
} from "../constants/checkoutConstants";
import axios from "axios";

export const checkout = (orderData) => async (dispatch, getState) => {
    dispatch({ type: CHECKOUT_REQUEST });
    try {
        const { userSignin } = getState(); 
        const token = userSignin.userInfo?.token;

        const { data } = await axios.post(
            "/api/checkout/create_payment_url", 
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
            }
        );

        const paymentUrl = data.paymentUrl; 
        if (!paymentUrl || typeof paymentUrl !== "string") {
            throw new Error("Invalid payment URL received from backend");
        }

        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: orderData, 
        });

        window.location.href = paymentUrl; 
    } catch (error) {
        dispatch({
            type: CHECKOUT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        console.error("Checkout error:", error); 
    }
};