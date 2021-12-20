import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Checkbox from "antd/lib/checkbox/Checkbox";
import FormItem from "antd/lib/form/FormItem";

import React, { useCallback, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import authenticationPresenter from "@modules/authentication/presenter";
import { checkValidSpaces } from "@shared/helper/functions";


const UpdatePass = (props) => {
  const [formData, setFormData] = useState({});
  const { location } = useHistory();
  const history = useHistory();
  const [customvalidity, setCustomValidity] = useState("");

  const [form] = useForm();
  const { otp } = useParams<{ otp: any }>();
  console.log(otp);
  const handleFinish = (values) => {
    authenticationPresenter.updatePass(values).then((res) => {
      history.push("/");
    });
  };

  const handleKeyPress = (e) => {
    e.charCode == 13 && form.submit();
  };

  return (
    <div className="Authen_forgot">
      <Card style={{ width: "25vw", margin: "auto" }}>
        <div className="Authen_changePass" style={{ paddingTop: "14vh" }}>
          <h1>MTC</h1>
        </div>
        <div className="Authen_content">
          <h2> UPDATE PASS </h2>

          <Form
            onFinish={handleFinish}
            form={form}
            className="main-form"
            layout="vertical"
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input Password!",
                },
                {
                  validator: (rule, value) =>
                    checkValidSpaces(rule, value, "userPass"),
                },
              ]}
            >
              <Input className="main-form" type="password"></Input>
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input confirm Password!",
                },
                {
                  validator: (rule, value) =>
                    checkValidSpaces(rule, value, "confirmPassword"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                className="main-form"
                type="password"
                onKeyDown={handleKeyPress}
              ></Input>
            </Form.Item>

            <div style={{ width: "100%", textAlign: "right" }}>
              <Button
                className="cancel-button mr-2"
                onClick={() => history.push("/")}
              >
                Cancel
              </Button>
              <Button className="normal-button" onClick={form.submit}>
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default UpdatePass;
