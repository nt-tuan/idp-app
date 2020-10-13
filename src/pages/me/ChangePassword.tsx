import { useReactOidc } from "@axa-fr/react-oidc-context";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { Button } from "components/Core";
import React from "react";
import { RequestError } from "resources/apis/api";
import { meAPI } from "resources/apis/me";
interface State {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emptyForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export const ChangePassword = () => {
  const { oidcUser } = useReactOidc();
  const [formData, setFormData] = React.useState<State>(emptyForm);
  const [formError, setFormError] = React.useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>();
  const [message, setMessage] = React.useState<{
    errors?: string[];
    success?: string;
  }>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormError(undefined);
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = () => {
    let isValid = true;
    if (formData.oldPassword === "") {
      setFormError((formError) => ({
        ...formError,
        oldPassword: "Bạn chưa nhập mật khẩu cũ kìa",
      }));
      isValid = false;
    }
    if (!formData.newPassword.match(regex)) {
      setFormError((formError) => ({
        ...formError,
        newPassword:
          "Mật khẩu đơn giản quá bạn ơi. Mật khẩu phải có 8 kí tự, trong đó có ít nhất 1 ký tự hoa [A..Z], 1 ký tự thường [a..z], 1 số [0..9], 1 ký tự đặc biệt [!@#$%^&*()]",
      }));
      isValid = false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setFormError((formError) => ({
        ...formError,
        confirmPassword: "Mật khẩu xác nhận không khớp bạn ơi",
      }));
      isValid = false;
    }
    if (!isValid) return;
    meAPI
      .changePassword(oidcUser, formData)
      .then(() => {
        setMessage({ success: "Đổi mật khẩu thành công" });
        setFormData(emptyForm);
      })
      .catch((err: RequestError) => setMessage({ errors: err.messages }));
  };
  return (
    <div>
      {message.errors &&
        message.errors.map((err, i) => (
          <div
            className="px-2 py-1 mb-1 text-red-100 bg-red-500 rounded"
            key={i}
          >
            {err}
          </div>
        ))}
      {message.success && (
        <div className="px-2 py-1 mb-1 text-green-100 bg-green-500 rounded">
          {message.success}
        </div>
      )}
      <div className="font-bold">
        Bạn đang sử dụng tài khoản <b>{oidcUser.profile.unique_name}</b>
      </div>
      <div className="mb-4">
        Bạn cho mình biết các thông tin dưới đây để thay đổi mật khẩu nhé
      </div>
      <FormGroup
        label="Mật khẩu cũ của bạn"
        labelInfo={
          formError?.oldPassword && (
            <div className="text-red-500">{formError.oldPassword}</div>
          )
        }
      >
        <InputGroup
          required
          fill
          value={formData.oldPassword}
          name="oldPassword"
          type="password"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup
        label="Mật khẩu mới của bạn"
        labelInfo={
          formError?.newPassword && (
            <div className="text-red-500">{formError.newPassword}</div>
          )
        }
      >
        <InputGroup
          required
          fill
          value={formData.newPassword}
          name="newPassword"
          type="password"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup
        label="Nhập mật khẩu mới một lần nữa"
        labelInfo={
          formError?.confirmPassword && (
            <div className="text-red-500">{formError.confirmPassword}</div>
          )
        }
      >
        <InputGroup
          required
          fill
          value={formData.confirmPassword}
          name="confirmPassword"
          type="password"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </FormGroup>
    </div>
  );
};
