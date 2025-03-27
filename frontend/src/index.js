import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "805980811634-g0rtmvm57jkkhfird8mdq8e3b60sgq2m.apps.googleusercontent.com"

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
