export interface RolesProps {
  name: string;
  description: string;
}

export interface UserRolesProps extends RolesProps {
  has: boolean;
}
