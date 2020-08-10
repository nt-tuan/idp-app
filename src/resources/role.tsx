import { api } from "./api";
import { RolesProps } from "./roleModel";

const getRoles = async () => {
  var roles = await api.get<RolesProps[]>(
    `${process.env.REACT_APP_API_URL}/api/admin/roles`
  );
  if (roles === undefined) return [] as RolesProps[];
  return roles;
};

export const role = { getRoles };
