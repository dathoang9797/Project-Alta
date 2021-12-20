import DefaultLayout from "src/layout/index";
import React, { useEffect } from "react";
import { privateRouter } from "../index";
import ShowRouter from "./ShowRouter";
import { useHistory } from "react-router";
import profileStore, {
  removeProfile,
} from "@modules/authentication/profileStore";
import { Selector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "src/shared/helper/functions";
import { RootState } from "@modules";
import { Switch } from "react-router-dom";
import authenticationPresenter from "@modules/authentication/presenter";
import UserEntity from "@modules/user/entity";
import config from "@config/index";

interface IPrivatePageSelector {
  token?: string;
  statusLogin?: boolean;
  remember?: boolean;
}

const PrivatePageSelector: Selector<RootState, IPrivatePageSelector> = (
  state: RootState
) => {
  return {
    token: state.profile.token,
    statusLogin: state.profile.statusLogin,
    remember: state.profile.remember,
  };
};

const PrivatePage: React.FC = () => {
  const dispatch = useDispatch();
  const { token, statusLogin } = useSelector(PrivatePageSelector);

  useEffect(() => {
    if (token) {
      // authenticationPresenter.getProfile().then((user: UserEntity) => {
      //   dispatch(profileStore.actions.fetchProfile({ user }));
      // });
    } else {
      window.location.href = config.LOGIN_PAGE;
    }
  }, [token]);
  // if(!statusLogin){
  //   return  <Switch></Switch>
  // }
  return (
    <Switch>{ShowRouter({ routers: privateRouter, MasterLayout: DefaultLayout })}</Switch>
  );
};
export default PrivatePage;
