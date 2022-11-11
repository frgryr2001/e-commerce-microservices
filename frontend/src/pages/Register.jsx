import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchRegister } from "../redux/authentication/authSlice";

const Register = () => {
  const [form] = Form.useForm();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    const { confirmPassword, ...other } = values;
    const data = { ...other };

    dispatch(fetchRegister({ data, toast, form }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
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
      <h1 style={{ textAlign: "center" }}>Đăng kí</h1>
      <Form.Item
        label="Họ tên"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên!",
          },
          {
            min: 6,
            message: "Họ tên phải có ít nhất 6 ký tự!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email!",
          },
          {
            type: "email",
            message: "Email không hợp lệ!",
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
            message: "Please input your password!",
          },
          {
            min: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập số điện thoại!",
          },
          {
            min: 10,
            max: 11,
            message: "Số điện thoại phải có ít nhất 10 ký tự!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ!",
          },
          {
            min: 6,
            message: "Địa chỉ phải có ít nhất 6 ký tự!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Link to="/login">&larr; Quay lại </Link>
        {/* arrow html */}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
