import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
      <h1 style={{ textAlign: "center" }}>Đăng kí</h1>
      <Form.Item
        label="Họ tên"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên!",
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
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirm-password"
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
