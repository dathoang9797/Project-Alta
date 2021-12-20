import enUS from "antd/lib/locale/en_US";
import accessManager from "./accessManager";
import account from "./account";
import adminInfo from "./adminInfo";
import application from "./application";
import common from "./common";
import forgotPassword from "./forgotPassword";
import login from "./login";
import resetPassword from "./resetPassword";
import server from "./server";

export default {
  ...enUS,
  ...common,
  ...server,
  ...login,
  ...accessManager,
  ...forgotPassword,
  ...resetPassword,
  ...account,
  ...application,
  ...adminInfo,
  "common.page": "Page",
};
