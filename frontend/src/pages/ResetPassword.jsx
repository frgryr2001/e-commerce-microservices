import React from "react";
import { Button, Form, Input } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchResetPassword } from "../redux/authentication/authSlice";
const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    if (values.password !== values.newPasswordConfirm) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    const { password } = values;
    dispatch(fetchResetPassword({ data: password, token, toast, history }));
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
      <h1 style={{ textAlign: "center" }}>Thay đổi mật khẩu</h1>

      <Form.Item
        label="Mật khẩu mới"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu mới!",
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
        label="Nhập lại mật khẩu mới"
        name="newPasswordConfirm"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu mới!",
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
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
