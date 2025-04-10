import Axios from "axios";
import {
    INVOICE_LIST_REQUEST, INVOICE_LIST_SUCCESS, INVOICE_LIST_FAIL,
    INVOICE_SAVE_REQUEST, INVOICE_SAVE_SUCCESS, INVOICE_SAVE_FAIL,
    INVOICE_DELETE_REQUEST, INVOICE_DELETE_SUCCESS, INVOICE_DELETE_FAIL
} from "../constants/invoiceConstants";

export const listInvoices = () => async (dispatch, getState) => {
    try {
        dispatch({ type: INVOICE_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();

        const { data: invoices } = await Axios.get("/api/invoices", {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        const updatedInvoices = await Promise.all(
            invoices.map(async (invoice) => {
                if (invoice.orderCode) {
                    try {
                        const ghnResponse = await Axios.post(
                            "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
                            { order_code: invoice.orderCode },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Token": "578fae62-122c-11f0-95d0-0a92b8726859" 
                                }
                            }
                        );

                        if (ghnResponse.data.code === 200 && ghnResponse.data.data.length > 0) {
                            const ghnOrder = ghnResponse.data.data;
                            const ghnStatus = ghnOrder.status;

                            var newStatus;
                            switch (ghnStatus) {
                                case "picking":
                                    newStatus = "picking";
                                    break;
                                case "picked":
                                    newStatus = "picked";
                                    break;
                                case "delivering":
                                    newStatus = "delivering";
                                    break;
                                case "delivered":
                                    newStatus = "delivered";
                                    break;
                                case "return":
                                    newStatus = "return";
                                    break;
                                case "cancel":
                                    newStatus = "cancelled";
                                    break;
                                case "pending":
                                    newStatus = "pending";
                                    break;
                                default:
                                    newStatus = invoice.status; 
                            }

                            if (newStatus !== invoice.status) {
                                await Axios.put(
                                    `/api/invoices/${invoice._id}`,
                                    { ...invoice, status: newStatus },
                                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                                );
                                return { ...invoice, status: newStatus };
                            }
                        }
                    } catch (ghnError) {
                        console.error(`GHN Error for orderCode ${invoice.orderCode}:`, ghnError.message);
                    }
                }
                return invoice; 
            })
        );

        dispatch({ type: INVOICE_LIST_SUCCESS, payload: updatedInvoices });
    } catch (error) {
        dispatch({ type: INVOICE_LIST_FAIL, payload: error.message });
    }
};

export const saveInvoice = (invoice) => async (dispatch, getState) => {
    try {
        dispatch({ type: INVOICE_SAVE_REQUEST, payload: invoice });
        const { userSignin: { userInfo } } = getState();
        if (!invoice._id) {
            const { data } = await Axios.post("/api/invoices", invoice, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            dispatch({ type: INVOICE_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await Axios.put(`/api/invoices/${invoice._id}`, invoice, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            dispatch({ type: INVOICE_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({ type: INVOICE_SAVE_FAIL, payload: error.message });
    }
};

export const deleteInvoice = (invoiceId) => async (dispatch, getState) => {
    try {
        dispatch({ type: INVOICE_DELETE_REQUEST, payload: invoiceId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.delete(`/api/invoices/${invoiceId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: INVOICE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: INVOICE_DELETE_FAIL, payload: error.message });
    }
};