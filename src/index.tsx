import React from "react";
import ReactDOM from "react-dom";
import "styles/core.scss";
import "styles/tailwind.out.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import Moment from "react-moment";
moment.locale("vi");
Moment.globalMoment = moment;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
