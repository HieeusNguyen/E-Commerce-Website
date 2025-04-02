import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin, loginWithGoogle } from "../actions/userAction";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function SigninScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
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
        dispatch(signin(email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className="error">{error}</div>}
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
                        <button type="submit" className="button primary">
                            Sign In
                        </button>
                    </li>
                    <li>New to Origami?</li>
                    <li>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(jwtDecode(credentialResponse.credential));
                                dispatch(loginWithGoogle(credentialResponse.credential));
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </li>
                    <li>
                        <Link
                            to={redirect === "/" ? "/register" : `/register?redirect=${redirect}`}
                            className="button secondary text-center"
                        >
                            Create your Origami account.
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default SigninScreen;