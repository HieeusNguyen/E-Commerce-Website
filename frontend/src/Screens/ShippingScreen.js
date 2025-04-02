import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/CartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country }));
        navigate("/payment");
    };
    
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Shipping</h2>
                        </li>
                        <li>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                required
                            />
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

export default ShippingScreen;