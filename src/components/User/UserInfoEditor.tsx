import React from "react";
import { IUser } from "resources/models/user";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import Avatar from "react-avatar";
import { RequestError } from "resources/apis/api";
import { ErrorMessage } from "components/core/ErrorMessage";
import { Stack } from "components/core/Stack";
import cx from "classnames";
export interface EditingUserInfo extends IUser {
  previewImage?: File;
}
interface Props {
  user: EditingUserInfo;
  onChange: (user: EditingUserInfo) => void;
  onCancel?: () => void;
  onSave?: () => void;
  err?: RequestError;
}

export const UserInfoEditor = ({
  user,
  err,
  onChange,
  onCancel,
  onSave,
}: Props) => {
  const [imageHover, setImageHover] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };
  const handleOpenFile = () => {
    ref.current?.click();
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;
    if (e.target.files.length === 0) return;
    const previewImage = e.target.files[0];
    onChange({ ...user, previewImage });
  };
  const handleCancelUploadImage = () => {
    onChange({ ...user, previewImage: undefined });
  };
  const image = React.useMemo(() => {
    if (user.previewImage != null) {
      return URL.createObjectURL(user.previewImage);
    }
    return user.image;
  }, [user]);
  return (
    <>
      {err && <ErrorMessage messages={err.messages} />}
      <div className="flex flex-row justify-center">
        <div
          className="group relative w-32 h-32"
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          onClick={() => setImageHover(true)}
        >
          <div
            className={cx("absolute inset-0 group-hover:opacity-25", {
              "opacity-25": imageHover,
            })}
          >
            <Avatar size="100%" name={user.username} src={image} round />
            <input
              className="hidden"
              ref={ref}
              type="file"
              onChange={handleSelectFile}
              accept="image/*"
              multiple={false}
            />
          </div>
          {imageHover && (
            <div className="absolute bottom-0 right-0">
              <Stack>
                {user.previewImage && (
                  <Button
                    icon="cross"
                    color="red"
                    onClick={handleCancelUploadImage}
                  ></Button>
                )}
                <Button icon="edit" onClick={handleOpenFile}></Button>
              </Stack>
            </div>
          )}
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
      <Stack>
        {onSave && <Button onClick={onSave}>Lưu</Button>}
        {onCancel && <Button onClick={onCancel}>Hủy</Button>}
      </Stack>
    </>
  );
};
