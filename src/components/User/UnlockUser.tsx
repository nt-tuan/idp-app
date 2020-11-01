import { toastError } from "components/Core";
import { OutlineButton } from "components/Core/Button";
import { UnlockIcon } from "components/Icon/Icons";
import { User } from "oidc-client";
import React from "react";
import { userAPI } from "resources/apis/user";
import cx from "classnames";
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
    <OutlineButton
      className={cx("mr-1", props.className)}
      onClick={handleUnlock}
    >
      <UnlockIcon className="w-5 h-5 pr-1" /> Mở khóa
    </OutlineButton>
  );
};
