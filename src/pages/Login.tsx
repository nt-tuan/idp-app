import React, { useState, useEffect } from "react";
import { idp } from "resources";
import { RequestError } from "resources/apis/api";
import { AppToaster } from "../components/Core/toaster";
import queryString from "query-string";
import cx from "classnames";
import { Input, Spinner } from "components/Core";
import {
  ArrowRight,
  DeleteIcon,
  KeyIcon,
  UserIcon,
} from "components/Icon/Icons";
export const Login = () => {
  const [login_challenge, setChallenge] = useState<string>();
  const [cred, setCred] = useState<{ username?: string; password: string }>({
    password: "",
  });
  const [lockUsername, setLockUsername] = useState<boolean>(true);
  const handleChange = (name: string, value: string) => {
    setCred((cred) => ({ ...cred, [name]: value }));
  };
  const handleLogout = () => {
    window.location.href =
      process.env.REACT_APP_AUTH_URL + "/oauth2/sessions/logout";
  };

  const onSubmit = () => {
    if (cred.username === undefined) return;
    if (login_challenge === undefined) {
      window.location.href = "/";
      return;
    }
    idp
      .login(cred.username, cred.password, login_challenge)
      .then((res) => {
        window.location.href = res.redirect_to;
      })
      .catch((err: RequestError) => {
        AppToaster.show({ message: err.message, intent: "danger" });
      });
  };

  const loadUser = () => {
    var query = queryString.parse(window.location.search);
    const login_challenge: string | undefined = query.login_challenge as
      | string
      | undefined;
    if (login_challenge == null || login_challenge === "") {
      window.location.href = process.env.REACT_APP_URL as string;
      return;
    }
    setChallenge(login_challenge);
    idp
      .getLogin(login_challenge)
      .then((res) => {
        setCred((cred) => ({ ...cred, username: res.username }));
        if (res.username != null && res.username !== "") {
          setLockUsername(true);
        } else {
          setLockUsername(false);
        }
      })
      .catch(() => (window.location.href = "/"));
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (cred.username === undefined) return <Spinner />;

  return (
    <div className="text-gray-700">
      <div className="flex flex-row items-center justify-center mb-16">
        <img className="inner" src="logo.svg" alt="logo" width="32" />
        <div className="pl-2 text-lg font-extrabold text-blue-500">LOGIN</div>
      </div>
      <input type="hidden" name="login_challenge" value={login_challenge} />
      <div className="w-full mb-2">
        <div className={cx("flex flex-row items-center")}>
          <div className="flex-1">
            <Input
              placeholder="Tài khoản"
              value={cred.username}
              name="username"
              onChange={handleChange}
              label={<UserIcon className="pr-4" />}
            />
          </div>
          {lockUsername && (
            <button
              className="font-bold hover:text-red-500"
              onClick={handleLogout}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
      <Input
        placeholder="Mật khẩu"
        value={cred.password}
        name="password"
        onChange={handleChange}
        label={<KeyIcon className="pr-4" />}
        type="password"
      />
      <div
        onClick={onSubmit}
        className="flex flex-row items-center justify-center w-full mt-8 cursor-pointer hover:text-blue-500"
      >
        <div className="pr-2 text-lg font-bold">Go</div>
        <ArrowRight />
      </div>
    </div>
  );
};
