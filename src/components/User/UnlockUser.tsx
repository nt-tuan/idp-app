import { toastError } from "components/core";
import { User } from "oidc-client";
import React from "react";
import { userAPI } from "resources/apis/user";
import cx from "classnames";
import { AnchorButton } from "@blueprintjs/core";
interface Props {
  oidcUser: User;
  userId: string;
  onChange: () => void;
  className?: string;
}

export const UnlockUser = (props: Props) => {
  const handleUnlock = () => {
    userAPI
      .unlock(props.oidcUser, props.userId)
      .then(props.onChange)
      .catch(toastError);
  };
  return (
    <AnchorButton
      minimal
      icon="unlock"
      className={cx("mr-1", props.className)}
      onClick={handleUnlock}
    >
      Mở khóa
    </AnchorButton>
  );
};
