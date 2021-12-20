import { Form, Input, Checkbox } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAsync } from "@hook/useAsync";
import authenticationPresenter from "@modules/authentication/presenter";
import NavLinkBottom from "./components/NavLinkBottom";
import { useAltaIntl } from "@shared/hook/useTranslate";

const { login } = authenticationPresenter;
const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [loginByAccount] = useAsync(login);
  const [checkError, setCheckError] = useState("");
  const {formatMessage} = useAltaIntl()
  const onFinishFailed = (errorInfo: any) => {
    setCheckError("");
  };

  const renderError = useMemo(() => {
    if (checkError == "" || checkError == null) return false;
    return (
      <div className="error-status">
        <ExclamationCircleOutlined />
        <p>{checkError}</p>
      </div>
    );
  }, [checkError]);

  const onSubmitAccount = (values: any) => {
    const remember = values.remember;
    let applicationId = undefined;
    if (location.search !== "") {
      applicationId = location.search.slice(1, location.search.length);
    }
    delete values.remember;
    values = { ...values, applicationId: applicationId };
    document.cookie = `remember_me=${true}; SameSite=None; Secure`;
    loginByAccount
      .execute(values, remember)
      .then((res) => {
        setCheckError("");
        setTimeout(() => {
          history.push("/");
        }, 300);
      })
      .catch((err) => {
        setCheckError(formatMessage("login.page.account.error"));
      });
  };

  return (
    <>
      <div className="main-form">
        <h3 className="main-title">{formatMessage("login.page.title")}</h3>
        <div className="content-form">
          <Form
            name="loginByAccount"
            layout="vertical"
            onFinish={onSubmitAccount}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label={formatMessage("login.page.userName")}
              name="accountUserName"
              rules={[
                {
                  required: true,
                  message: `${formatMessage(
                    "login.page.form.required"
                  )} ${formatMessage("login.page.userName")}`,
                },
              ]}
            >
              <Input placeholder={formatMessage("login.page.userName")} />
            </Form.Item>

            <Form.Item
              label={formatMessage("login.page.password")}
              name="accountPassword"
              rules={[
                {
                  required: true,
                  message: `${formatMessage(
                    "login.page.form.required"
                  )} ${formatMessage("login.page.password")}`,
                },
              ]}
            >
              <Input.Password
                placeholder={formatMessage("login.page.password")}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              className="remember__login"
            >
              <Checkbox>{formatMessage("login.page.remember")}</Checkbox>
            </Form.Item>

            <div>{renderError}</div>

            <Form.Item>
              <div className="button-center__box">
                <button type="submit" className="normal-button">
                  {formatMessage("login.page.button.account")}
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
