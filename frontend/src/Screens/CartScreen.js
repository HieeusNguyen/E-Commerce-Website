import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/CartAction";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function CartScreen() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { id } = useParams(); 
    const location = useLocation(); 
    const qty = location.search
        ? Number(location.search.split("=")[1])
        : 1;
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const removeFromCartHandler = productId => {
        dispatch(removeFromCart(productId));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]); 

    const checkoutHandler = () => {
        navigate("/shipping");
    };

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h1>Your Cart</h1>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? (
                        <div>
                            <h1>Cart is Empty.</h1>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <li key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Quantity :
                                        <select
                                            value={item.qty}
                                            onChange={e =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                            className="cart-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">${item.price}</div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button
                    className="button primary full-width"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;