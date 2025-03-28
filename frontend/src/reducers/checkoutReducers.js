import {
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
} from "../constants/checkoutConstants";

const initialState = {
    loading: false,
    error: null,
    order: null,
};

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return { ...state, loading: true };
        case CHECKOUT_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };
        case CHECKOUT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};