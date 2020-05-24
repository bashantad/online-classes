import React from "react";
import { render } from "react-dom";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";

document.addEventListener("DOMContentLoaded", () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.body.appendChild(document.createElement("div"))
    );
});
