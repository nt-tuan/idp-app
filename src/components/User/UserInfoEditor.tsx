import React from "react";
import { IUser } from "resources/models/user";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import Avatar from "react-avatar";
import { EditIcon } from "components/Icon/Icons";
import { IRole } from "resources/models/role";
interface Props {
  allRoles: IRole[];
  user: IUser;
  onChange: (user: IUser) => void;
  onRefresh?: () => void;
}
export const UserInfoEditor = ({ user, onChange }: Props) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0">
            <Avatar size="100%" name={user.username} src={user.image} round />
          </div>
          <div className="absolute bottom-0 right-0">
            <EditIcon className="cursor-pointer w-4 h-4" />
          </div>
        </div>
      </div>
      <FormGroup label="Tên tài khoản">
        <InputGroup readOnly name="username" defaultValue={user.username} />
      </FormGroup>
      <FormGroup label="Email">
        <InputGroup
          name="email"
          defaultValue={user.email}
          onBlur={handleBlur}
        />
      </FormGroup>
      <FormGroup label="Tên đầy đủ">
        <InputGroup
          name="fullname"
          defaultValue={user.fullname}
          onBlur={handleBlur}
        />
      </FormGroup>
      <FormGroup label="Số điện thoại">
        <InputGroup
          name="phone"
          defaultValue={user.phone}
          onBlur={handleBlur}
        />
      </FormGroup>
    </>
  );
};
