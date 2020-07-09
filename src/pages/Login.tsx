import React, { useState, useEffect } from "react";
import { Button, InputGroup, Spinner } from "@blueprintjs/core";
import { LoginAPI } from "resources/LoginAPI";
const queryString = require("query-string");
export const Login = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [challenge, setChallenge] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    var query = queryString.parse(window.location.search);
    console.log(query);
    LoginAPI.get(query.login_challenge)
      .then((res) => {
        if (res.skip && res.redirect_to != null) {
          window.location.replace(res.redirect_to);
        }
        setChallenge(res.challenge);
      })
      .catch(setError);
  }, []);

  if (loading) return <Spinner />;
  return (
    <div>
      <h3 className="bp3-heading">Đăng nhập</h3>
      <InputGroup placeholder="Mã nhân viên" leftIcon="user" />
      <InputGroup placeholder="Mật khẩu" leftIcon="key" />
      <Button>Login</Button>
    </div>
  );
};
