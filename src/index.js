import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

/* GLOBAL VARIABLES */

window.$primaryLanguage = "en";
window.$secondaryLanguage = "";
window.$primaryLanguageIconId = "primary-lang-icon";
window.$secondaryLanguageIconId = "";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
