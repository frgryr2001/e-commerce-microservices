import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import ListCategory from "../ListCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
} from "../../../redux/Category/categorySlice";
import Spinner from "../../Layouts/Spinner";
import { toast } from "react-toastify";
const Category = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const isLoading = useSelector(
    (state) => state.categories?.status === "loading"
  );
  const categories = useSelector(
    (state) => state.categories?.categoryName || []
  );
  const onFinish = (values) => {
    const { categoryName } = values;
    dispatch(createCategory({ categoryName, form, toast, token }));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 ">Quản lý danh mục</h1>

      <Form
        form={form}
        wrapperCol={{
          span: 10,
        }}
        name="category"
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          style={{ marginBottom: "20px" }}
          label="Tên danh mục"
          name="categoryName"
          wrapperCol={{
            span: 6,
          }}
        >
          <Input style={{ marginBottom: "10px" }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            style={{ marginBottom: "10px" }}
            htmlType="submit"
          >
            Tạo{" "}
          </Button>
        </Form.Item>
      </Form>

      {!isLoading && <ListCategory categories={categories} />}
      {isLoading && <Spinner />}
    </div>
  );
};
export default Category;
