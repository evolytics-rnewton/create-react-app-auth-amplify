import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "normalize.css/normalize.css";
import "./index.css";
// import "@reach/tabs/styles.css";
// import "@reach/dialog/styles.css";
import amplifyConfig from "./aws-exports";

Amplify.configure(amplifyConfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();