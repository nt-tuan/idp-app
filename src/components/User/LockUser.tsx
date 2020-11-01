import { Popover } from "@blueprintjs/core";
import { Menu, MenuItem, toastError } from "components/Core";
import { OutlineButton } from "components/Core/Button";
import { LockIcon } from "components/Icon/Icons";
import { User } from "oidc-client";
import moment from "moment";
import React from "react";
import { userAPI } from "resources/apis/user";
import cx from "classnames";
interface Props {
  oidcUser: User;
  userId: string;
  onChange: () => void;
  className?: string;
}
export const LockUser = (props: Props) => {
  const handleLock = (
    amount: number,
    unit: "day" | "week" | "month" | "year"
  ) => {
    const lockEnd = moment().add(amount, unit);
    userAPI
      .lock(props.oidcUser, props.userId, lockEnd.toDate())
      .then(props.onChange)
      .catch(toastError);
  };
  return (
    <Popover
      content={
        <Menu className={cx("divide-y px-2", props.className)}>
          <MenuItem content="1 ngày" onClick={() => handleLock(1, "day")} />
          <MenuItem content="1 tuần" onClick={() => handleLock(1, "week")} />
          <MenuItem content="1 tháng" onClick={() => handleLock(1, "month")} />
          <MenuItem content="1 năm" onClick={() => handleLock(1, "year")} />
        </Menu>
      }
    >
      <OutlineButton className="mr-1">
        <LockIcon className="w-5 h-5 pr-1" /> Khóa
      </OutlineButton>
    </Popover>
  );
};
