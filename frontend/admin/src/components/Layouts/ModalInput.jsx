import { useState } from "react";
import React from "react";

import { Form, Modal } from "antd";
import FormCustom from "../Contents/FormCustomProduct/FormCustom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/Products/productSlice";
export default function ModalWithForm({ visible, setVisible }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(createProduct(values));
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width="70%"
      >
        <FormCustom form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
}
