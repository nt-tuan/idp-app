export interface DepartmentProps {
  fullname: string;
  shortname: string;
  code: string;
}
export interface EmployeProps {
  fullname: string;
  code: string;
  birthday?: Date;
  gender: number;
  department?: DepartmentProps;
}

export interface UserProps {
  username: string;
  email: string;
  string: string;
  roles: string[];
  employee?: EmployeProps;
}
