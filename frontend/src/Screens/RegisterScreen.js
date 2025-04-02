import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userAction";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }
        dispatch(register(name, email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className="error">{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="repassword">Retype Password</label>
                        <input
                            type="password"
                            id="repassword"
                            name="repassword"
                            value={rePassword}
                            onChange={e => setRePassword(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Register
                        </button>
                    </li>
                    <li>Already Have an account?</li>
                    <li>
                        <Link
                            to={redirect === "/" ? "/signin" : `/signin?redirect=${redirect}`}
                            className="button secondary text-center"
                        >
                            Sign-In
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}
export default RegisterScreen;