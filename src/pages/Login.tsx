import React from "react";
import { Button, InputGroup } from "@blueprintjs/core";

export const Login = () => {
  return (
    <div>
      <h3 className="bp3-heading">Đăng nhập</h3>
      <InputGroup placeholder="Mã nhân viên" leftIcon="user" />
      <InputGroup placeholder="Mật khẩu" leftIcon="key" />
      <Button>Login</Button>
    </div>
  );
};
