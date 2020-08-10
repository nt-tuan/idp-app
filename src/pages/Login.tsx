import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormGroup, Classes } from "@blueprintjs/core";
import { idp } from "resources";
import { RequestError } from "resources/api";
import { AppToaster } from "./toaster";
import { LogoutButton } from "components/LogoutButton";
const queryString = require("query-string");
export const Login = () => {
  const [login_challenge, setChallenge] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [lockUsername, setLockUsername] = useState<boolean>(true);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };
  const onSubmit = () => {
    if (username === undefined) return;
    if (login_challenge === undefined) {
      window.location.href = "/";
      return;
    }
    idp
      .login(username, login_challenge)
      .then((res) => {
        window.location.href = res.redirect_to;
      })
      .catch((err: RequestError) => {
        AppToaster.show({ message: err.message, intent: "danger" });
      });
  };
  useEffect(() => {
    var query = queryString.parse(window.location.search);
    const login_challenge = query.login_challenge;
    if (login_challenge == undefined || login_challenge == "") {
      window.location.href = process.env.REACT_APP_URL as string;
    }
    setChallenge(login_challenge);
    idp
      .getLogin(login_challenge)
      .then((res) => {
        setUsername(res.subject);
        if (res.subject != null && res.subject != "") {
          setLockUsername(true);
        } else {
          setLockUsername(false);
        }
      })
      .catch(() => (window.location.href = "/"));
  }, []);

  if (username === undefined)
    return <div className={Classes.SKELETON} style={{ height: "200px" }}></div>;

  return (
    <div>
      <h3 className="bp3-heading">Đăng nhập</h3>
      <FormGroup>
        <input type="hidden" name="login_challenge" value={login_challenge} />
        <InputGroup
          readOnly={lockUsername}
          placeholder="Mã nhân viên"
          leftIcon="user"
          required
          name="username"
          value={username}
          onChange={onChange}
        />
        <Button onClick={onSubmit}>Đăng nhập</Button>
        {lockUsername && <LogoutButton redirect={false} />}
      </FormGroup>
    </div>
  );
};
