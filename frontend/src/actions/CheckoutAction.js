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

        if (!token) {
            throw new Error("User not authenticated. Please sign in.");
        }

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

        const { paymentUrl, ghnOrder, invoiceId } = data; 
        if (!paymentUrl || typeof paymentUrl !== "string") {
            throw new Error("Invalid payment URL received from backend");
        }

        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: {
                orderData,     
                paymentUrl,     
                ghnOrder,       
                invoiceId      
            },
        });

        window.location.href = paymentUrl; 
    } catch (error) {
        dispatch({
            type: CHECKOUT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        console.error("Checkout error:", error.message); 
    }
};