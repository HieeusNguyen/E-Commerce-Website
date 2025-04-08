import {
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
} from "../constants/checkoutConstants";

const initialState = {
    loading: false,
    error: null,
    orderData: null,  
    paymentUrl: null, 
    ghnOrder: null,  
    invoiceId: null,  
};

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return { ...state, loading: true, error: null }; 
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                orderData: action.payload.orderData,
                paymentUrl: action.payload.paymentUrl,
                ghnOrder: action.payload.ghnOrder,
                invoiceId: action.payload.invoiceId,
                error: null
            };
        case CHECKOUT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};