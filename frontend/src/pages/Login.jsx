import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";

import { fetchLogin } from "../redux/authentication/authSlice";
const Login = () => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onFinish = (values) => {
    dispatch(fetchLogin({ data: values, toast, history }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 style={{ textAlign: "center" }}>Đăng nhập</h1>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              message: "Email không hợp lệ!",
              type: "email",
            },
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Link to="/register" style={{ marginRight: "10px" }}>
            Đăng ký
          </Link>
          <Link to="/forgotPassword">Quên mật khẩu</Link>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </>
  );
};
export default Login;
