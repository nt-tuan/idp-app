export interface IRole {
  name: string;
  description: string;
}

export interface UserRolesProps extends IRole {
  has: boolean;
}
