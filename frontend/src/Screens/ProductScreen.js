import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsProduct(id));
        return () => {};
    }, [dispatch, id]);

    const handleAddToCart = () => {
        navigate(`/cart/${id}?qty=${qty}`); 
    };

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">
                    <span className="material-icons">arrow_back</span>
                </Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : product ? (
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.brand}</h4>
                            </li>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews}{" "}
                                Reviews)
                            </li>
                            <li>
                                $<b>{product.price}</b>
                            </li>
                            <li>
                                <div>{product.description}</div>
                            </li>
                            <li>
                                Net Qty:
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                >
                                    {[...Array(product.countInStock).keys()].map(
                                        (x) => (
                                            <option key={x} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        )
                                    )}
                                </select>
                            </li>
                            <li>
                                {product.countInStock > 0
                                    ? "In Stock"
                                    : "Unavailable"}
                            </li>
                            <li>
                                {product.countInStock > 0 && (
                                    <button
                                        onClick={handleAddToCart}
                                        className="button"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
}

export default ProductScreen;