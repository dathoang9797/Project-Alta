import moment from "moment";

class UserEntity {
  accountId: string = "";
  accountFullName: string = "";
  accountPhone: string = "";
  accountEmail: string = "";
  accountIdentityCard: string = "";
  applicationId: string = "";
  accountLastAccess: string = "";
  accountCreateAt: string = "";
  accountStatus: number;
  accountType: number;
  accountPermissions: AccountPermissionEntity[];

  constructor(user) {
    if (!user) return;
    Object.assign(this, user);
    this.accountPermissions =user?.accountPermissions && user?.accountPermissions.length > 0? user?.accountPermissions.map(item => new AccountPermissionEntity(item)) : [];
    this.accountLastAccess = user?.accountLastAccess ? moment(user?.accountLastAccess).format("DD/MM/YYYY HH:mm:ss") : "";
  }

  static createArrayUser(arrUser: Array<any>): Array<UserEntity> {
    const list = arrUser.map((x) => new UserEntity(x));
    return list;
  }
}

export class AccountPermissionEntity {
  
  accountPermissionId: string;
  permissionCode: string;
  accountId: string;
  accountPermissionCreateAt: string;
  constructor(permission) {
    if (!permission) return;
    Object.assign(this, permission);
  }
}

export class PermissionEntity {
  permissionCode:     string = "";
  permissionName:     string = "";
  moduleName:         string = "";
  permissionCreateAt: string = "";
  constructor(permission) {
    if (!permission) return;
    Object.assign(this, permission);
  }
  static createlistPermisison(listPer) {
    if(!Array.isArray(listPer))return null;
    return listPer.map(permission => {
      return new PermissionEntity(permission)
    })
  }
}


export default UserEntity;
