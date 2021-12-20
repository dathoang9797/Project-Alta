import { Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import authenticationPresenter from "@modules/authentication/presenter";
import { useAsync } from "@shared/hook/useAsync";
import { checkValidSpaces } from "@shared/helper/functions";
import NavLinkBottom from "../components/NavLinkBottom";

const Reset = () => {
  const history = useHistory();
  const intl = useIntl();

  const [checkOTP, setCheckOTP] = useState<Boolean>(true);
  const [checkError, setCheckError] = useState("");

  const { resetPass, checkOtb } = authenticationPresenter;
  const [{ execute: resetPasscall }] = useAsync(resetPass);
  const [checkOtbCall] = useAsync(checkOtb);
  const { otp } = useParams<{ otp: any }>();
  useEffect(() => {
    checkOtbCall
      .execute(otp)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        setCheckOTP(false);
      });
  }, []);

  const onSubmitResetPassword = (values) => {
    resetPasscall(values, otp).then((res) => {
      history.push("/login");
    });
  };

  const useTranslate = (key: string) => {
    return intl.formatMessage({ id: key });
  };

  const onFinishFailed = (errorInfo: any) => {
    setCheckError("");
    console.log("Failed:", errorInfo);
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

  return (
    <>
      {checkOTP ? (
        <div className="main-form reset-password-form">
          <h3 className="main-title">{useTranslate("reset.password.title")}</h3>
          <div className="content-form">
            <Form
              name="resetPassword"
              layout="vertical"
              onFinish={onSubmitResetPassword}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                label={useTranslate("reset.password.newPassword")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: `${useTranslate(
                      "login.page.form.required"
                    )} ${useTranslate("reset.password.newPassword")}`,
                  },
                ]}
              >
                <Input.Password
                  placeholder={useTranslate("reset.password.newPassword")}
                />
              </Form.Item>

              <Form.Item
                label={useTranslate("reset.password.confirm.newPassword")}
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: `${useTranslate(
                      "login.page.form.required"
                    )} ${useTranslate("reset.password.confirm.newPassword")}`,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(useTranslate("reset.password.not.match"))
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={useTranslate(
                    "reset.password.confirm.newPassword"
                  )}
                />
              </Form.Item>
              <div>{renderError}</div>
              <Form.Item>
                <div className="button-center__box">
                  <button type="submit" className="normal-button">
                    {useTranslate("common.button.accept")}
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className="main-form reset-password-form">
          <div className="error-token__box">
            <h3 className="main-title">
              {useTranslate("reset.password.title.error")}
            </h3>
            <p>{useTranslate("reset.password.notification")}</p>
            <div className="button-center__box">
              <button
                onClick={() => history.push("/login")}
                className="normal-button"
              >
                {useTranslate("common.button.return")}
              </button>
            </div>
          </div>
        </div>
      )}
      <NavLinkBottom
        navLink={useTranslate("link.return.login")}
        onClick={() => history.push("/login")}
      />
    </>
  );
};
export default Reset;
