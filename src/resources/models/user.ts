export interface DepartmentProps {
  id: number;
  fullname: string;
  shortname: string;
  code: string;
}
export interface EmployeProps {
  id: number;
  fullname: string;
  code: string;
  birthday?: Date;
  gender: number;
  department?: DepartmentProps;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone?: string;
  image?: string;
  roles: string[];
  fullname?: string;
  employee?: EmployeProps;
  lockoutEnable: boolean;
  lockoutEnd?: string;
}

export interface CreatedUser {
  username: string;
  password: string;
  email: string;
  roles: string[];
  lockoutEnable: boolean;
  lockoutEnd?: Date;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}

export const isUserLocked = (user: IUser) => {
  return (
    user.lockoutEnable === true &&
    user.lockoutEnd != null &&
    new Date(user.lockoutEnd) > new Date()
  );
};
