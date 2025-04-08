import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkout } from "../actions/CheckoutAction";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);
    const userSignin = useSelector((state) => state.userSignin || {});
    const checkoutState = useSelector((state) => state.checkout);
    const { cartItems, shipping, payment } = cart;
    const { userInfo } = userSignin;
    const { loading, error, paymentUrl, invoiceId, ghnOrder } = checkoutState;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin"); 
        } else if (!shipping.address) {
            navigate("/shipping");
        } else if (!payment.paymentMethod) {
            navigate("/payment");
        }
    }, [userInfo, shipping, payment, navigate]);

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const placeOrderHandler = () => {
        console.log("cartItems trước khi gửi:", cartItems); 
        if (!userInfo || !userInfo._id) {
            navigate("/signin"); 
            return;
        }

        const orderData = {
            amount: totalPrice,
            orderDescription: `Order from user ${userInfo?.name || "Guest"} - Total: ${totalPrice}`,
            orderType: "250000",
            bankCode: "",
            language: "vn",
            userId: userInfo?._id,
            items: cartItems.map((item) => ({
                name: item.name,
                productId: item.product,
                quantity: item.qty,
                price: item.price,
            })),
            shippingAddress: {
                address: shipping.address,
                city: shipping.city,
                postalCode: shipping.postalCode,
                country: shipping.country,
            },
            paymentMethod: payment.paymentMethod,
            weight: cartItems.reduce((a, c) => a + (c.weight || 200), 0),
        };
        console.log("orderData gửi đi:", orderData);
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
                        <div>Payment Method: {payment.paymentMethod || "Not selected"}</div>
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
                                            <img src={item.image} alt={item.name} />
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
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>{itemsPrice.toFixed(2)}đ</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>{shippingPrice.toFixed(2)}đ</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>{taxPrice.toFixed(2)}đ</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>{totalPrice.toFixed(2)}đ</div>
                        </li>
                        {!paymentUrl && (
                            <li>
                                <button
                                    className="button primary full-width"
                                    onClick={placeOrderHandler}
                                    disabled={loading || cartItems.length === 0}
                                >
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </li>
                        )}
                    </ul>
                    {error && <div className="error-message">{error}</div>}
                    {paymentUrl && (
                        <div className="payment-link">
                            <p>Order placed successfully!</p>
                            <a
                                href={paymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button primary full-width"
                            >
                                Proceed to Payment
                            </a>
                            {invoiceId && <p>Invoice ID: {invoiceId}</p>}
                            {ghnOrder && (
                                <p>GHN Order Code: {ghnOrder.order_code || "N/A"}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;