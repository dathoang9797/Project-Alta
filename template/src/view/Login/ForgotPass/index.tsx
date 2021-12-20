import { Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useAsync } from "@hook/useAsync";
import authenticationPresenter from "@modules/authentication/presenter";
import NavLinkBottom from "../components/NavLinkBottom";

const ForgotPassword = () => {
  const history = useHistory();
  const intl = useIntl();
  const { forgotPass } = authenticationPresenter;
  const [forgotPasscall] = useAsync(forgotPass);

  const [checkError, setCheckError] = useState("");
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

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
            <p className="description">
              {useTranslate("forgot.password.description")}
            </p>
            <div className="content-form">
              <Form
                name="forgotPassword"
                layout="vertical"
                onFinish={onSubmitEmail}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  label={useTranslate("forgot.password.email")}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: `${useTranslate(
                        "login.page.form.required"
                      )} ${useTranslate("forgot.password.email")}`,
                    },
                    {
                      type: "email",
                      message: `${useTranslate(
                        "forgot.password.email.invalid"
                      )}`,
                    },
                  ]}
                >
                  <Input placeholder="david@gmail.com" />
                </Form.Item>
                <div>{renderError}</div>
                <Form.Item>
                  <div className="button-center__box">
                    <button type="submit" className="normal-button">
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
      <NavLinkBottom
        navLink={useTranslate("link.return.login")}
        onClick={() => history.push("/login")}
      />
    </>
  );
};
export default ForgotPassword;
