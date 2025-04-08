import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/CartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart || { payment: {} });

    const submitHandler = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }
        dispatch(savePayment({ paymentMethod }));
    };

    useEffect(() => {
        if (cart.payment?.paymentMethod) { 
            navigate("/placeorder");
        }
    }, [cart.payment, navigate]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li>
                            <div>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="vnpay"
                                    value="vnpay"
                                    checked={paymentMethod === "vnpay"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="vnpay">VNPay</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="cod"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="cod">Cash on Delivery (COD)</label>
                            </div>
                        </li>
                        <li>
                            <button
                                type="submit"
                                className="button primary"
                                disabled={!paymentMethod}
                            >
                                Continue
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default PaymentScreen;