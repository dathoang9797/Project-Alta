import { Form, Input, Statistic } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

import authenticationPresenter from "@modules/authentication/presenter";
import { RootState } from "@modules";
import { useAsync } from "@shared/hook/useAsync";
import OTPInput from "../components/OTPInput";
import NavLinkBottom from "../components/NavLinkBottom";

const LoginByOTP = () => {
  const history = useHistory();
  const intl = useIntl();
  const { getOtpCode, loginByOTPCode } = authenticationPresenter;
  const [getOTP] = useAsync(getOtpCode);
  const [loginOTP] = useAsync(loginByOTPCode);

  const currentLanguage = useSelector(
    (state: RootState) => state.settingStore.language
  );
  const { Countdown } = Statistic;

  const [checkError, setCheckError] = useState("");
  const [pageOTP, setPageOTP] = useState(false);
  const [timeOver, setTimeOver] = useState<number>(0);
  const [otpCode, setOtpCode] = useState("");
  const [errorOTP, setErrorOTP] = useState(false);
  const [countError, setCountError] = useState(0);
  const [numberPhone, setNumberPhone] = useState("");
  const [outOfTime, setOutOfTime] = useState(false);
  const [accountId, setAccountId] = useState("");

  const useTranslate = (key: string) => {
    return intl.formatMessage({ id: key });
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

  const onFinishFailed = (errorInfo: any) => {
    setCheckError("");
    console.log("Failed:", errorInfo);
  };

  const onRequestOTP = (values: any) => {
    getOTP
      .execute(values)
      .then((res) => {
        setCheckError("");
        setPageOTP(true);
        setNumberPhone(values.userMobilePhone);
        const deadline = Date.now() + 120 * 1000;
        setTimeOver(deadline);
        setAccountId(res.accountId);
      })
      .catch((err) => {
        setCheckError(useTranslate("login.page.mobile.error"));
      });
  };

  const onChangeOTP = (otp) => {
    const otpString = otp.toString();
    if (otpString.length === 6) {
      setCheckError("");
      setOtpCode(otpString);
    } else {
      setCheckError(useTranslate("login.page.form.required.otp"));
    }
  };

  const onSubmitOTP = (limitSubmit: number) => {
    if (otpCode) {
      console.log("Submit OTP", otpCode, accountId);
      const values = { otpCode: otpCode, accountId: accountId };
      loginOTP
        .execute(values)
        .then((res) => {
          setCheckError("");
          setTimeout(() => {
            history.push("/");
          }, 300);
        })
        .catch((err) => {
          setCheckError(useTranslate("login.page.opt.error"));
          setOutOfTime(true);
          setCountError((preState) => {
            if (preState + 1 === limitSubmit) {
              setErrorOTP(true);
            }
            return preState + 1;
          });
        });
    } else {
      setCheckError(useTranslate("login.page.form.required.otp"));
    }
  };

  const onResendOTP = () => {
    setOutOfTime(false);
    const deadline = Date.now() + 120 * 1000;
    setTimeOver(deadline);
    setCountError(0);
    console.debug("Gui lai so dien thoai", numberPhone);
  };

  return (
    <>
      <div className="main-form form-login-otp">
        {!pageOTP ? (
          <>
            <h3 className="main-title">{useTranslate("login.page.title")}</h3>
            <div className="content-form">
              <Form
                name="loginByMobilePhone"
                layout="vertical"
                onFinish={onRequestOTP}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  label={useTranslate("login.page.mobile")}
                  name="accountPhone"
                  rules={[
                    {
                      required: true,
                      message: `${useTranslate(
                        "login.page.form.required"
                      )} ${useTranslate("login.page.mobile")}`,
                    },
                  ]}
                >
                  <Input placeholder={useTranslate("login.page.mobile")} />
                </Form.Item>
                <div className="captcha__box">
                  <Form.Item
                    name="reCaptcha"
                    rules={[
                      {
                        required: true,
                        message: `${useTranslate("login.page.check.captcha")}`,
                      },
                    ]}
                  >
                    <ReCAPTCHA
                      className="g-recaptcha"
                      // Mã dành cho localhost để thử nghiệm
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      hl={currentLanguage}
                    />
                  </Form.Item>
                </div>
                <div>{renderError}</div>
                <Form.Item>
                  <div className="button-center__box">
                    <button className="normal-button" type="submit">
                      {useTranslate("login.page.button.mobile")}
                    </button>
                  </div>
                </Form.Item>
                <div className="or-method__box">
                  <p>Hoặc</p>
                </div>
                <Form.Item>
                  <div className="button-center__box">
                    <button
                      onClick={() => {
                        setPageOTP(false);
                        history.push("/login");
                      }}
                      className="cancel-button"
                    >
                      {useTranslate("login.page.button.by.account")}
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </>
        ) : !errorOTP ? (
          <>
            <h3 className="main-title">{useTranslate("login.page.title")}</h3>
            <div className="otp-input__box">
              <Form name="sendOTP" layout="vertical" requiredMark={false}>
                <div className="otp__box">
                  <Form.Item name="OTP" label="OTP">
                    <OTPInput
                      autoFocus
                      isNumberInput
                      length={6}
                      className="otpContainer"
                      inputClassName="otpInput"
                      onChangeOTP={(otp) => onChangeOTP(otp)}
                    />
                    <div>{renderError}</div>
                  </Form.Item>
                </div>
              </Form>
              <div>
                <p className="status-otp">
                  <FormattedMessage
                    id="login.page.opt.notification"
                    values={{
                      time: (
                        <Countdown
                          format="ss"
                          value={timeOver}
                          onFinish={() => setOutOfTime(true)}
                        />
                      ),
                      code: (word) => <span>{word}</span>,
                    }}
                  />
                </p>
                {outOfTime && (
                  <a className="link-otp" onClick={onResendOTP}>
                    {useTranslate("login.page.resend.otp")}
                  </a>
                )}
              </div>
              <div>
                <button
                  className="normal-button"
                  onClick={() => onSubmitOTP(5)}
                >
                  {useTranslate("common.button.accept")}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="lock-account__box">
            <h3 className="main-title">
              {useTranslate("login.page.lock.title")}
            </h3>
            <p>{useTranslate("login.page.lock.notification")}</p>
            <div className="button__box">
              <button className="cancel-button">
                {useTranslate("login.page.button.contact.support")}
              </button>
            </div>
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
export default LoginByOTP;
