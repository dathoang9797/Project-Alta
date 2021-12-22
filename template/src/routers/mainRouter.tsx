import React from "react";
import { ReactNode } from "react";
import { routerPageError } from "@view/PageError/router";
import { routerLogin, routerMainPublicPage } from "@view/Login/routerLogin";
import { AppstoreOutlined } from "@ant-design/icons";                           
import { IRouter } from "./interface";
import {routerHome} from '@view/Home/router'

export const privatePage: IRouter[] = [
  routerHome,
];

export const publicPage: IRouter[] = [
  routerMainPublicPage,
  routerLogin,
  {
    path: "/login/otp",
    loader: import("@view/Login/LoginByOTP"),
    exact: true,
  },
  {
    path: "/forgotpass",
    loader: import("@view/Login/ForgotPass"),
    exact: true,
  },
  {
    path: "/resetPass/:otp",
    loader: import("@view/Login/ResetPass"),
    exact: true,
  },
  routerPageError,
];
