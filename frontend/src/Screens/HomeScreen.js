import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Corousel from "../components/Corousel";

function HomeScreen(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(listProducts());
        return () => {
        };
    }, []);

    return (
        <div>
            <Corousel />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : products && Array.isArray(products) ? (
                <ul className="products">
                    {products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        className="product-image"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </Link>
                                <Link to={`/product/${product._id}`}>
                                    <div className="product-name">{product.name}</div>
                                </Link>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <div className="product-rating">
                                    {/* {product.rating} Stars ({product.numReviews} Reviews) */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No products available</div>
            )}
        </div>
    );
}

export default HomeScreen;
