import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    saveInvoice,
    listInvoices,
    deleteInvoice
} from "../actions/InvoiceAction";

function InvoicesScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [userId, setUserId] = useState("");
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState("");
    const [status, setStatus] = useState("pending");
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("");

    const invoiceList = useSelector(state => state.invoiceList);
    const { loading, invoices, error } = invoiceList || {};

    const invoiceSave = useSelector(state => state.invoiceSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = invoiceSave || {};

    const invoiceDelete = useSelector(state => state.invoiceDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = invoiceDelete || {};

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listInvoices());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = invoice => {
        setModalVisible(true);
        setId(invoice._id);
        setUserId(invoice.user._id); 
        setItems(invoice.items);
        setTotalAmount(invoice.totalAmount);
        setStatus(invoice.status);
        setShippingAddress({
            address: invoice.shippingAddress.address || "",
            city: invoice.shippingAddress.city || "",
            postalCode: invoice.shippingAddress.postalCode || "",
            country: invoice.shippingAddress.country || ""
        });
        setPaymentMethod(invoice.paymentMethod);
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(
            saveInvoice({
                _id: id,
                user: userId,
                items,
                totalAmount,
                status,
                shippingAddress,
                paymentMethod
            })
        );
    };

    const deleteHandler = invoice => {
        dispatch(deleteInvoice(invoice._id));
    };

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Invoices</h3>
            </div>
            {modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Edit Invoice</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="userId">User ID</label>
                                <input
                                    type="text"
                                    value={userId}
                                    name="userId"
                                    id="userId"
                                    disabled
                                />
                            </li>
                            <li>
                                <label htmlFor="totalAmount">Total Amount</label>
                                <input
                                    type="number"
                                    value={totalAmount}
                                    name="totalAmount"
                                    id="totalAmount"
                                    disabled
                                />
                            </li>
                            <li>
                                <label htmlFor="status">Status</label>
                                <select
                                    value={status}
                                    name="status"
                                    id="status"
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor="paymentMethod">Payment Method</label>
                                <input
                                    type="text"
                                    value={paymentMethod}
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    disabled
                                />
                            </li>
                            <li>
                                <label>Shipping Address</label>
                                <input
                                    type="text"
                                    value={shippingAddress.address}
                                    name="address"
                                    placeholder="Address"
                                    onChange={e =>
                                        setShippingAddress({ ...shippingAddress, address: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    name="city"
                                    placeholder="City"
                                    onChange={e =>
                                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    onChange={e =>
                                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={shippingAddress.country}
                                    name="country"
                                    placeholder="Country"
                                    onChange={e =>
                                        setShippingAddress({ ...shippingAddress, country: e.target.value })
                                    }
                                />
                            </li>
                            <li>
                                <label>Items</label>
                                <ul>
                                    {items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - Qty: {item.quantity} - Price: {item.price}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <button type="submit" className="button primary">
                                    Update
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}

            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order Code</th>
                            <th>User</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices && invoices.map(invoice => (
                            <tr key={invoice._id}>
                                <td>{invoice.orderCode}</td>
                                <td>{invoice.user?.name}</td>
                                <td>{invoice.totalAmount}</td>
                                <td>{invoice.status}</td>
                                <td>{invoice.paymentMethod}</td>
                                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="product-button"
                                        onClick={() => openModal(invoice)}
                                    >
                                        Edit
                                    </button>
                                    {"  "}
                                    <button
                                        className="product-button secondary"
                                        onClick={() => deleteHandler(invoice)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </div>
        </div>
    );
}

export default InvoicesScreen;