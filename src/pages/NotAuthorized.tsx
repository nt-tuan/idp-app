import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Button } from "@blueprintjs/core";
import { Stack } from "components/core/Stack";
import React from "react";
import { useHistory } from "react-router-dom";

export const NotAuthorized = () => {
  const { logout } = useReactOidc();
  const history = useHistory();
  return (
    <div>
      <div>Tài khoản của bạn không được phép truy cập trang này</div>
      <Stack className="pt-24">
        <Button icon="chevron-backward" onClick={() => history.goBack()}>
          Back
        </Button>
        <Button icon="home" onClick={() => (window.location.href = "/")}>
          Trang chủ
        </Button>
        <Button icon="log-in" onClick={() => logout()}>
          Đăng nhập
        </Button>
      </Stack>
    </div>
  );
};
