import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";

import App from "./components/App";
import store from './app/store'
import ToggleColorMode from "./utils/ToggleColorMode";

const theme = createTheme({})

ReactDOM.render(
    <Provider store={store}>
        <ToggleColorMode theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToggleColorMode>
    </Provider>,
    document.getElementById('root'))