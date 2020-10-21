import { toastError } from "components/Core";
import { OutlineButton } from "components/Core/Button";
import { UnlockIcon } from "components/Icon/Icons";
import { User } from "oidc-client";
import React from "react";
import { userAPI } from "resources/apis/user";
interface Props {
  oidcUser: User;
  userId: string;
  onChange: () => void;
}

export const UnlockUser = (props: Props) => {
  const handleUnlock = () => {
    userAPI
      .unlock(props.oidcUser, props.userId)
      .then(props.onChange)
      .catch(toastError);
  };
  return (
    <OutlineButton className="mr-1" onClick={handleUnlock}>
      <UnlockIcon className="w-5 h-5 pr-1" /> Mở khóa
    </OutlineButton>
  );
};
