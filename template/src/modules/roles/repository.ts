import httpRepository, { HTTPRepository } from "@core/repository/http";
import RoleEntity from "./entity";
import { RequestRole } from "./interface";

const getListRole = async (params:{businessOrganizationId?:string}) => {
  const response = await httpRepository.execute({
    path: "/api/Roles",
    method: "get",
    config: { isPrivate: true },
    params,
    showSuccess: false,
  });
 
  return {
    data: RoleEntity.createListRole(response.pagedData),
    info: null
  };
};
const getRoleDetail = async (id) => {
  const response = await httpRepository.execute({
    path: "/api/Roles/" + id,
    method: "get",
    config: { isPrivate: true },
    showSuccess: false,
  });

  return new RoleEntity(response);
};


const addRole = async (payload: RequestRole) => {
  const response = await httpRepository.execute({
    path: "/api/Roles",
    method: "post",
    config: { isPrivate: true },
    payload,
    showSuccess: true,
  });
  return new RoleEntity(response);
};
const updateRole = async (
  payload: { roleName: string; permissionIds: Array<string> },
  idRole
) => {
  const response = await httpRepository.execute({
    path: "/api/Roles/" + idRole,
    method: "put",
    payload,
    config: { isPrivate: true },

    showSuccess: true,
  });
  return new RoleEntity(response);
};
const removeRole = async (payload: { idRole: string }) => {
  const response = await httpRepository.execute({
    path: "/api/Roles/" + payload.idRole,
    method: "delete",
    config: { isPrivate: true },

    showSuccess: true,
  });
  return new RoleEntity(response);
};
const getRoleInGroup = async (payload: { groupId: string }) => {
  const response = await httpRepository.execute({
    path: "/api/Roles/inGroup/" + payload.groupId,
    method: "get",
    config: { isPrivate: true },
    showSuccess: false,
  });
  return RoleEntity.createListRole(response);
};

export default {
  getListRole,
  addRole,
  updateRole,
  removeRole,
  getRoleInGroup,
  getRoleDetail,
};
