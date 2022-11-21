import { Input, Space, Table, Modal } from "antd";
import React, { useRef, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import Form from "antd/es/form/Form";
import {
  deleteCategory,
  updateCategory,
} from "../../redux/Category/categorySlice";
import { toast } from "react-toastify";
const { Column } = Table;

const ListCategory = ({ categories }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token);
  const isLoading = useSelector(
    (state) => state.categories?.status === "loading"
  );
  const [name, setName] = useState();
  const [id, setId] = useState("");

  const data = categories.map((category, index) => {
    return {
      name: category.name,
      slug: category.slug,
      key: category._id,
    };
  });
  const [isEditing, setIsEditing] = useState(false);

  const resetEditing = () => {
    setIsEditing(false);
  };
  return (
    <>
      <Table dataSource={data}>
        <Column title="Tên danh mục" dataIndex="name" key="name" />
        <Column title="Tên slug" dataIndex="slug" key="slug" />

        <Column
          title="Action"
          key="action"
          render={(_, record) => {
            return (
              <Space size="middle">
                <EditOutlined
                  style={{ color: "blue" }}
                  onClick={() => {
                    // default value
                    setName(record.name);
                    setId(record.key);
                    setIsEditing(true);
                    console.log(record);
                  }}
                />
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => {
                    console.log(record);
                    Modal.confirm({
                      title: "Bạn có chắc chắn muốn xóa danh mục này?",
                      icon: <ExclamationCircleOutlined />,
                      content: "Danh mục này sẽ bị xóa vĩnh viễn",
                      okText: "Xóa",
                      okType: "danger",
                      cancelText: "Hủy",
                      onOk() {
                        dispatch(
                          deleteCategory({ id: record.key, toast, token })
                        );
                      },
                    });
                  }}
                />
              </Space>
            );
          }}
        />
      </Table>
      <Modal
        title="Chỉnh sửa danh mục"
        visible={isEditing}
        width={"70%"}
        okText="Lưu"
        confirmLoading={isLoading}
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          dispatch(updateCategory({ categoryName: name, id, toast, token }));
          resetEditing();
        }}
      >
        <Form.Item label="Tên danh mục">
          <Input
            style={{ marginBottom: "10px" }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
    </>
  );
};
export default ListCategory;
