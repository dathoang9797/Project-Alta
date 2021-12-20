import viVN from "antd/lib/locale/vi_VN";
import login from "./login";
import common from "./common";
import server from "./server";
import accessManager from "./accessManager";
import pageError from "./pageError";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import adminInfo from "./adminInfo";
import application from "./application";
import account from "./account";
export default {
  ...viVN,
  ...common,
  ...server,
  ...login,
  ...accessManager,
  ...pageError,
  ...forgotPassword,
  ...resetPassword,
  ...adminInfo,
  ...application,
  ...account,
  "common.page": "Trang",
};
