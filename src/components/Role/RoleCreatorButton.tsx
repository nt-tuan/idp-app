import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Drawer, Icon } from "@blueprintjs/core";
import { Button, TextButton, toastError } from "components/Core";
import React from "react";
import { roleAPI } from "resources/apis/role";
import { IRole } from "resources/models/role";
import { RoleCreatorForm } from "./RoleCreatorForm";
interface Props {
  onSuccess: (role: IRole) => void;
}
export const RoleCreatorButton = ({ onSuccess }: Props) => {
  const { oidcUser } = useReactOidc();
  const [isOpen, setIsOpen] = React.useState(false);
  const [role, setRole] = React.useState<IRole>({
    name: "",
    description: "",
  });
  const handleSubmit = () => {
    roleAPI
      .create(oidcUser, role)
      .then(onSuccess)
      .then(() => setIsOpen(false))
      .catch(toastError);
  };
  return (
    <>
      <TextButton onClick={() => setIsOpen(true)}>
        <Icon icon="plus" />
      </TextButton>
      <Drawer
        size={Drawer.SIZE_SMALL}
        title={
          <div className="text-blue-500 rounded-t text-lg font-bold py-2 px-1 text-center">
            Tạo vai trò mới
          </div>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col h-full pt-8">
          <div className="flex-1 px-8">
            <RoleCreatorForm role={role} onChange={setRole} />
          </div>
          <Button className="w-full py-2 justify-center" onClick={handleSubmit}>
            <Icon className="mr-2" icon="floppy-disk" /> Lưu
          </Button>
        </div>
      </Drawer>
    </>
  );
};
