import React, { memo } from "react";
import { Selector } from "@reduxjs/toolkit";
import UserEntity from "@modules/user/entity";
import { useSelector } from "react-redux";
import ChangeLanguage from "@shared/components/ChangeLanguage";
import { RootState } from "@modules";
import { imgAvatar, noImg } from "@shared/assets/images";
import { Badge, } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

interface IHeaderComponent {
  profile?: UserEntity;
}

const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = (
  state: RootState
) => {
  return {
    profile: state.profile.user,
  };
};

const HeaderComponent = () => {
  const { profile } = useSelector(HeaderComponentSelector);
  const history = useHistory();

  return (
    <>
      <div className="header-component">
        <div className="header-component__language">
          <ChangeLanguage />
        </div>
        {/* for mobifone  */}
        <div className="bell-badge">
          <div className="noti-badge">5</div>
          <BellOutlined className="icon-bell" />
        </div>

        <div
          className="header-component__dropdown"
        >
          <div className="dropdown__profile__img">
            <img alt="img-avatar" className="img-avatar" src={profile?.accountAvatar || imgAvatar} />
          </div>
        </div>
        <div className="header-component__identify" onClick={() => {
          history.push("/profile")
        }}
        >
          <h4 className="identify__admin">{profile?.accountFullName}</h4>
          <p className="identify__place">{profile?.area?.areaName || "Unknown"}</p>
          <p className="identify__hi">{profile?.role?.roleName || "Unknown"}</p>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderComponent);
