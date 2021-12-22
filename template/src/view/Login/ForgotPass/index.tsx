import { Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useAsync } from "@hook/useAsync";
import authenticationPresenter from "@modules/authentication/presenter";
import NavLinkBottom from "../components/NavLinkBottom";
import { userImg, shiedImg } from "@shared/assets/images";
import { Transition } from 'react-transition-group';

const ForgotPassword = () => {
  const history = useHistory();
  const intl = useIntl();
  const { forgotPass } = authenticationPresenter;
  const [forgotPasscall] = useAsync(forgotPass);
  const [focused, setFocused] = useState(false)
  const [checkError, setCheckError] = useState("");
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);
  
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const useTranslate = (key: string) => {
    return intl.formatMessage({ id: key });
  };

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

  const onSubmitEmail = (values: any) => {
    forgotPasscall
      .execute(values)
      .then((res) => {
        setCheckSuccessEmail(true);
      })
      .catch((err) => {
        setCheckError(useTranslate("forgot.password.email.not.exit"));
      });
  };

  return (
    <>
      <div className="main-form forgot-password-form">
        <h3 className="main-title">{useTranslate("forgot.password.title")}</h3>
        {!checkSuccessEmail ? (
          <>
            <div className="content-form">
              <Form
                name="forgotPassword"
                layout="vertical"
                onFinish={onSubmitEmail}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  label={useTranslate("login.page.userName")}
                  name="accountUserName"
                  rules={[
                    {
                      required: true,
                      message: `${useTranslate(
                        "login.page.form.required"
                      )} ${useTranslate("login.page.userName")}`,
                    },
                  ]}
                >
                  <img src={userImg} alt="" />
                  <Input onFocus={onFocus} onBlur={onBlur}/>
                </Form.Item>
                <Form.Item
                  label={useTranslate("forgot.password.identification")}
                  name="identificationCode"
                  rules={[
                    {
                      required: true,
                      message: `${useTranslate(
                        "login.page.form.required"
                      )} ${useTranslate("forgot.password.identification")}`,
                    },
                    {
                      message: `${useTranslate(
                        "forgot.password.identification.invalid"
                      )}`,
                    },
                  ]}
                >
                  <Input onFocus={onFocus}onBlur={onBlur}/>
                  <NavLinkBottom
                    navLink={useTranslate("link.return.login")}
                    onClick={() => history.push("/login")}
                  />
                </Form.Item>
                <div>{renderError}</div>
                <Form.Item>
                  <div className="button-center__box">
                    <button type="submit" className={`normal-button ${focused ? '' : 'background__button'}`}>
                      {useTranslate("forgot.password.button.accept")}
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </>
        ) : (
          <div className="status__box">
            <p>{useTranslate("forgot.password.notification")}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default ForgotPassword;
