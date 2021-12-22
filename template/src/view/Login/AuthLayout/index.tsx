import { Col, Row } from "antd";
import React, { PropsWithChildren } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { banner, logo } from "@shared/assets/images";
import ChangeLanguage from "@shared/components/ChangeLanguage";

interface IDefaultLayoutProps {}

const AuthLayout: React.FC<PropsWithChildren<IDefaultLayoutProps>> = (
  props
) => {
  return (
    <div className="auth-page">
      <Row style={{ height: "100%" }}>
        <div className="banner__img">
          <Col xs={24} sm={24} md={24} lg={14} xl={10}>
            <div className="main__box">
              <div className="logo__box">
                <img src={logo} alt="logo" />
              </div>
              {props.children}
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default React.memo(AuthLayout);
