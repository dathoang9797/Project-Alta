import { PaginationConvert, PaginationParam } from "@core/pagination/entity";
import httpRepository from "@core/repository/http";
import UserEntity from "@modules/user/entity";
import User, { PermissionEntity } from "@modules/user/entity";


const addUser = async (payload) => {
  return await httpRepository.execute({
    path: `/api/Accounts`,
    method: "post",
    payload,
    config: { isPrivate: true },
  });
};
const updateUser = async (payload, id) => {
  return await httpRepository.execute({
    path: `/api/Accounts/${id}`,
    method: "put",
    payload,
    config: { isPrivate: true },
  });
};

const deleteUser = async (payload) => {
  return await httpRepository.execute({
    path: `/api/Accounts/DeleteMany`,
    method: "post",
    payload,
    config: { isPrivate: true },
  });
};

const getUser = async (params, option) => {
  const dataListGroup = await httpRepository.execute({
    path: `/api/Accounts`,
    params: { ...new PaginationParam(params), accountStatus: option.accountStatus },
    showError: false,
    showSuccess: false,
  });
  return {
    data: User.createArrayUser(dataListGroup.pagedData),
    info: new PaginationConvert(dataListGroup.pageInfo),
  };
};

const getDetailUser = async (params) => {
  return await httpRepository.execute({
    path: `/api/Accounts/${params}`,
    showError: false,
    showSuccess: false,
    convert: (res) => new UserEntity(res)
  });
};

const getPermission = async () => {
  return httpRepository.execute({
    path: "/api/Permissions",
    showSuccess: false,
    convert: (res) => PermissionEntity.createlistPermisison(res)
  })
}

export default {
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
  getPermission,
  getUser,

};
