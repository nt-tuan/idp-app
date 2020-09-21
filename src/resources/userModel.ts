import { timeStamp } from "console";

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

export interface IUserProps {
  id: string;
  username: string;
  email: string;
  roles: string[];
  employee?: EmployeProps;
  lockoutEnable: boolean;
  lockoutEnd?: string;
}

export class UserProps implements IUserProps {
  id: string;
  username: string;
  email: string;
  roles: string[];
  employee?: EmployeProps | undefined;
  lockoutEnable: boolean;
  lockoutEnd?: string;
  isLock() {
    return (this.lockoutEnable &&
      this.lockoutEnd &&
      new Date(this.lockoutEnd) > new Date()) as boolean;
  }

  constructor(user: IUserProps) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.roles = user.roles;
    this.employee = user.employee;
    this.lockoutEnable = user.lockoutEnable;
    this.lockoutEnd = user.lockoutEnd;
  }
}
