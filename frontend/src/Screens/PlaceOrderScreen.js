import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkout } from "../actions/CheckoutAction"; 
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);
    const checkoutState = useSelector((state) => state.checkout); 
    const { cartItems, shipping, payment } = cart;
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!shipping.address) {
            navigate("/shipping");
        } else if (!payment) {
            navigate("/payment");
        }
    }, [shipping, payment, navigate]);

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const placeOrderHandler = () => {
        const orderData = {
            amount: totalPrice, 
            orderDescription: `Order from user - Total: ${totalPrice}`, 
            orderType: "250000", 
            bankCode: "", 
            language: "vn", 
            cartItems: cartItems, 
            shippingAddress: shipping, 
            paymentMethod: payment.paymentMethod, 
        };

        dispatch(checkout(orderData));
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping</h3>
                        <div>
                            {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>Payment Method: {payment ? payment.paymentMethod : 'Not selected'}</div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Shopping Cart</h3>
                                <div>Price</div>
                            </li>
                            {cartItems.length === 0 ? (
                                <div>Cart is Empty.</div>
                            ) : (
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="cart-image">
                                            <img src={item.image} alt="product" />
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={"/product/" + item.product}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div>Quantity: {item.qty}</div>
                                        </div>
                                        <div className="cart-price">${item.price}</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button
                                className="button primary full-width"
                                onClick={placeOrderHandler}
                                disabled={checkoutState.loading} 
                            >
                                {checkoutState.loading ? "Processing..." : "Place Order"}
                            </button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                    {checkoutState.error && (
                        <div className="error-message">{checkoutState.error}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;