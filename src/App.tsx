import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route } from "react-router-dom";
import { Login, Consent } from "pages/index";
import { Card } from "@blueprintjs/core";
import "styles/App.css";
function App() {
  return (
    <Card className="App">
      <div className="card-header">
        <img className="inner" src="/logo-gt.png" alt="logo" width="50" />
        <h2 className="inner bp3-heading" style={{ marginLeft: "3px" }}>
          CHỨNG THỰC NGƯỜI DÙNG
        </h2>
      </div>
      <hr />
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/consent" exact component={Consent} />
      </BrowserRouter>
    </Card>
  );
}

export default App;
