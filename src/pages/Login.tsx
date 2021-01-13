import React, { useState, useEffect } from "react";
import { idp } from "resources";
import { RequestError } from "resources/apis/api";
import queryString from "query-string";
import { Button, ControlGroup, Icon, InputGroup } from "@blueprintjs/core";
import { Spinner } from "components/utils";
import {
  defaultErrorMessage,
  translateErrorMessages,
} from "resources/translation/errors";
import { ErrorMessage } from "components/utils/ErrorMessage";

const SkipLoginView = ({
  username,
  onLogout,
}: {
  username: string;
  onLogout: () => void;
}) => {
  return (
    <>
      <ControlGroup fill={true} vertical={false}>
        <InputGroup leftIcon="key" value={username} readOnly />
        <Button icon="cross" onClick={onLogout} />
      </ControlGroup>
    </>
  );
};

const LoginView = ({
  username,
  password,
  onChange,
  onLogin,
}: {
  username: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
}) => (
  <>
    <ControlGroup className="mb-2" fill={true} vertical={false}>
      <InputGroup
        leftIcon="people"
        placeholder="Tên tài khoản"
        value={username}
        name="username"
        onChange={onChange}
      />
    </ControlGroup>
    <ControlGroup fill={true} vertical={false}>
      <InputGroup
        leftIcon="key"
        placeholder="Mật khẩu"
        value={password}
        name="password"
        type="password"
        onChange={onChange}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            onLogin();
          }
        }}
      />
    </ControlGroup>
  </>
);
export const Login = () => {
  const [login_challenge, setChallenge] = useState<string>();
  const [cred, setCred] = useState<{ username: string; password: string }>();
  const [skip, setSkip] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessages(undefined);
    if (cred == null) return;
    setCred((cred) => (cred ? { ...cred, [name]: value } : cred));
  };
  const handleLogout = () => {
    window.location.href =
      process.env.REACT_APP_AUTH_URL + "/oauth2/sessions/logout";
  };

  const handleSubmit = () => {
    if (cred == null) return;
    if (login_challenge === undefined) {
      window.location.href = "/";
      return;
    }
    if (skip) {
      idp
        .login(cred.username, cred.password, login_challenge)
        .then((res) => {
          window.location.href = res.redirect_to;
        })
        .catch((err: RequestError) => {
          setMessages(
            translateErrorMessages(err.messages, defaultErrorMessage)
          );
        });
      return;
    }
    if (cred.username === "") {
      setMessages(["Bạn chưa điền tên tài khoản kìa"]);
      return;
    }
    if (cred.password === "") {
      setMessages(["Bạn chưa điền mật khẩu kìa"]);
      return;
    }

    idp
      .login(cred.username, cred.password, login_challenge)
      .then((res) => {
        window.location.href = res.redirect_to;
      })
      .catch((err: RequestError) => {
        setMessages(translateErrorMessages(err.messages, defaultErrorMessage));
      });
  };

  useEffect(() => {
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
          setSkip(res.skip);
          if (res.skip) {
            setCred({ password: "", username: res.subject });
            return;
          }
          setCred({ password: "", username: "" });
        })
        .catch(handleLogout);
    };

    loadUser();
  }, []);

  if (cred === undefined)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="text-gray-700">
      {messages && (
        <div className="mb-2">
          <ErrorMessage messages={messages} />
        </div>
      )}
      {skip ? (
        <SkipLoginView username={cred.username} onLogout={handleLogout} />
      ) : (
        <LoginView
          username={cred.username}
          password={cred.password}
          onChange={handleChange}
          onLogin={handleSubmit}
        />
      )}
      <div
        onClick={handleSubmit}
        className="flex flex-row items-center justify-center w-full mt-8 cursor-pointer hover:text-blue-500"
      >
        <div className="pr-2 text-lg font-bold">Đăng nhập</div>
        <Icon icon="arrow-right" />
      </div>
    </div>
  );
};
