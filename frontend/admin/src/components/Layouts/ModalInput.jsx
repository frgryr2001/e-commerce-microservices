import { useEffect, useState } from "react";
import React from "react";

import { Form, Modal } from "antd";
import FormCustom from "../Contents/FormCustomProduct/FormCustom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/Products/productSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/Category/categorySlice";
export default function ModalWithForm({ visible, setVisible }) {
  const [form] = Form.useForm();
  const [optionsProduct, setOptionsProduct] = useState([]);
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();
  const onFinish = (productData) => {
    const product = {
      ...productData,
      product_options: optionsProduct,
    };
    console.log(product);
    dispatch(createProduct({ product, form, toast, token }));
    setOptionsProduct([]);
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
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
        <FormCustom
          form={form}
          onFinish={onFinish}
          optionsProduct={optionsProduct}
          setOptionsProduct={setOptionsProduct}
        />
      </Modal>
    </>
  );
}
