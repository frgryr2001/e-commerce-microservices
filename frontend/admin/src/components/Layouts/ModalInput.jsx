import { useState } from "react";
import React from "react";

import { Form, Modal } from "antd";
import FormCustom from "../Contents/FormCustomProduct/FormCustom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/Products/productSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function ModalWithForm({ visible, setVisible }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (product) => {
    dispatch(createProduct({ product, form, toast }));
  };
  const isLoading = useSelector((state) => state.products?.status);


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
        confirmLoading={isLoading === "loading" || false}
        width="70%"
      >
        <FormCustom form={form} onFinish={onFinish} />
      </Modal>
    </>
  );
}
