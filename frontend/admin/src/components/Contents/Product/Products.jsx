import React from "react";
import ModalWithForm from "../../Layouts/ModalInput";
import { Button, Table, Modal, Form } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FormCustom from "../FormCustomProduct/FormCustom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/Products/productSlice";
import Spinner from "../../Layouts/Spinner";
import { toast } from "react-toastify";
const Products = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({}); // product detail
  const products = useSelector((state) => state.products?.products || []);
  const isLoading = useSelector(
    (state) => state.products?.status === "loading"
  );

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  // add key in products list
  const dataSource = products.map((product, index) => {
    // convert price to VND
    const price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(product.price);

    return {
      ...product,
      price,
      key: index,
    };
  });
  // const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      key: "images",
      title: "Hình ảnh",
      dataIndex: "images",
      render: (img) => <img width={100} src={img[0].image_url} alt="img" />,
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
      key: "manufacture",
      title: "Nhà sản xuất",
      dataIndex: "manufacture",
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
                onDeleteProduct(record);
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

  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        dispatch(deleteProduct({ id: record._id, toast }));
      },
    });
  };
  const onEditProduct = (record) => {
    setProduct({ ...record });
    setIsEditing(true);
  };
  const resetEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 ">Quản lý sản phẩm</h1>

      <Button onClick={showModal} className="mb-2">
        Add Product
      </Button>
      <ModalWithForm visible={visible} setVisible={setVisible} />
      {!isLoading && <Table columns={columns} dataSource={dataSource} />}
      {isLoading && <Spinner />}
      <Modal
        title="Edit Student"
        visible={isEditing}
        width={"70%"}
        okText="Save"
        onCancel={() => {
          setProduct({});
          resetEditing();
        }}
        onOk={() => {
          form.submit();
          // resetEditing();
        }}
      >
        <FormCustom form={form} onFinish={onFinish} product={product} />
      </Modal>
    </div>
  );
};

export default Products;
