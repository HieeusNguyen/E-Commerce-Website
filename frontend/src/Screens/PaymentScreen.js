import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/CartAction";
import { useNavigate } from "react-router-dom"; 
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        navigate("/placeorder"); 
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                onChange={e => setPaymentMethod(e.target.value)}
                                value="paypal"
                            />
                            <label htmlFor="paymentMethod">Paypal</label>
                        </li>
                        <li>
                            <button type="submit" className="button primary">
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