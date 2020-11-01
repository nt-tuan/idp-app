import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { IRole } from "resources/models/role";
interface Props {
  role: IRole;
  onChange: (setRole: (role: IRole) => IRole) => void;
}
export const RoleCreatorForm = ({ role, onChange }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange((role) => ({ ...role, [name]: value }));
  };
  return (
    <div>
      <FormGroup label="Tên vai trò">
        <InputGroup
          name="name"
          value={role.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup label="Mô tả">
        <InputGroup
          name="description"
          value={role.description}
          onChange={handleInputChange}
        />
      </FormGroup>
    </div>
  );
};
