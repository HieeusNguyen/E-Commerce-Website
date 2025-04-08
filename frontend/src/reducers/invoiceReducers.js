import {
    INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_LIST_FAIL,
    INVOICE_SAVE_REQUEST, INVOICE_SAVE_SUCCESS, INVOICE_SAVE_FAIL,
    INVOICE_DELETE_REQUEST, INVOICE_DELETE_SUCCESS, INVOICE_DELETE_FAIL
} from "../constants/invoiceConstants";

export const invoiceListReducer = (state = { invoices: [] }, action) => {
    switch (action.type) {
        case INVOICE_LIST_REQUEST:
            return { loading: true };
        case INVOICE_LIST_SUCCESS:
            return { loading: false, invoices: action.payload };
        case INVOICE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const invoiceSaveReducer = (state = {}, action) => {
    switch (action.type) {
        case INVOICE_SAVE_REQUEST:
            return { loading: true };
        case INVOICE_SAVE_SUCCESS:
            return { loading: false, success: true, invoice: action.payload };
        case INVOICE_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const invoiceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INVOICE_DELETE_REQUEST:
            return { loading: true };
        case INVOICE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case INVOICE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};