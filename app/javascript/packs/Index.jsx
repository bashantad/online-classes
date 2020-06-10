import React from "react";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './webrtc-old-browsers';
import { render } from "react-dom";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";
import './index.scss'

document.addEventListener("DOMContentLoaded", () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.body.appendChild(document.createElement("div"))
    );
});
