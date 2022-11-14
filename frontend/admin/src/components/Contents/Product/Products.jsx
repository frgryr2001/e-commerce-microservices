import React from "react";
import ModalWithForm from "../../Layouts/ModalInput";
import { Button, Table, Modal, Form } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FormCustom from "../FormCustomProduct/FormCustom";
const Products = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      img: "https://i0.wp.com/epthinktank.eu/wp-content/uploads/2021/09/EPRS-Briefing-698028-General-product-safety-regulation-FINAL.png?fit=1000%2C666&ssl=1",
      name: "John",
      price: "500",
      quantity: "10",
    },
    {
      key: "2",
      img: "https://sites.google.com/site/thietkewebtaihanoi/_/rsrc/1480308136221/kien-thuc-web/tim-kiem-hinh-anh-dep-cho-giao-dien-website/T%C3%ACm%20ki%E1%BA%BFm%20h%C3%ACnh%20%E1%BA%A3nh%20%C4%91%E1%BA%B9p%20cho%20giao%20di%E1%BB%87n%20website-1.jpg",
      name: "John",
      price: "200",
      quantity: "10",
    },
  ]);
  const columns = [
    {
      key: "img",
      title: "Hình ảnh",
      dataIndex: "img",
      render: (img) => <img width={100} src={img} alt="img" />,
    },
    {
      key: "name",
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      key: "price",
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      key: "quantity",
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditProduct(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const showModal = () => {
    setVisible(true);
  };
  const onFinish = (values) => {
    console.log(values);
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditProduct = (record) => {
    setIsEditing(true);
  };
  const resetEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="ml-[180px] p-10">
      <Button onClick={showModal}>Add Product</Button>
      <ModalWithForm visible={visible} setVisible={setVisible} />
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Edit Student"
        visible={isEditing}
        width={"70%"}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          form.submit();
          // resetEditing();
        }}
      >
        <FormCustom form={form} onFinish={onFinish} />
      </Modal>
    </div>
  );
};

export default Products;
