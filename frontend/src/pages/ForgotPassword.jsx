import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
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
      <h1 style={{ textAlign: "center" }}>Quên mật khẩu</h1>

      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
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
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
