import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { logout } from "./actions/userAction";

import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SigninScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import PaymentStatus from "./Screens/PaymentStatus";

import logo from "./Images/logo.png";
import UserManagementScreen from "./Screens/UsersManagementScreen";
import InvoicesScreen from "./Screens/InvoiceScreen";

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    console.log("userInfo = ", userInfo ?? "")
    const dispatch = useDispatch();
    
    const openmenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    };
    
    const closemenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    };

    const handleLogout = () => {
        dispatch(logout()); 
    };

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openmenu}>☰</button>
                        <Link to="/">
                            Dongho.vn
                            <img src={logo} className="logo" alt="logo" />
                        </Link>
                    </div>
                    <div className="header-links">
                        <span>
                            <Link to="/cart">
                                <span className="material-icons">
                                    shopping_cart
                                </span>
                            </Link>
                        </span>
                        <span className="user-menu">
                            {userInfo ? (
                                <div className="user-menu-wrapper">
                                    <Link to="/profile" className="user-name">
                                        {userInfo.name}
                                    </Link>
                                    <div className="dropdown-menu">
                                        {userInfo.isAdmin === true && (
                                            <>
                                                <Link to="/admin/users">Quản lý người dùng</Link>
                                                <Link to="/products">Quản lý sản phẩm</Link>
                                                <Link to="/invoices">Quản lý đơn hàng</Link>
                                            </>
                                        )}
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/signin">
                                    <span className="material-icons">login</span>
                                </Link>
                            )}
                        </span>
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Categories</h3>
                    <button
                        className="sidebar-close-button"
                        onClick={closemenu}
                    >
                        <span className="material-icons">arrow_back_ios</span>
                    </button>
                    <ul>
                        <li><a href="index.html">Mens</a></li>
                        <li><a href="index.html">Women</a></li>
                        <li><a href="index.html">Unisex</a></li>
                        <li><a href="index.html">Children</a></li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Routes>
                            <Route path="/products" element={<ProductsScreen />} />
                            <Route path="/shipping" element={<ShippingScreen />} />
                            <Route path="/payment" element={<PaymentScreen />} />
                            <Route path="/payment/status" element={<PaymentStatus />} />
                            <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/register" element={<RegisterScreen />} />
                            <Route path="/product/:id" element={<ProductScreen />} />
                            <Route path="/" element={<HomeScreen />} exact />
                            <Route path="/cart/:id?" element={<CartScreen />} />
                            <Route path="/admin/users" element={<UserManagementScreen />} />
                            <Route path="/invoices" element={<InvoicesScreen />} />
                        </Routes>
                    </div>
                </main>
                <footer className="footer">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;