import { DownOutlined } from "@ant-design/icons";
import { Badge, Modal, Table, Form, Select } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../../redux/Orders/orderSlice";

import { toast } from "react-toastify";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
const color = {
  pink: "Hồng",
  red: "Đỏ",
  yellow: "Vàng",
  green: "Xanh lá",
  blue: "Xanh dương",
  purple: "Tím",
  black: "Đen",
  white: "Trắng",
  orange: "Cam",
};
const Orders = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [idOrder, setIdOrder] = useState("");
  const token = useSelector((state) => state.auth?.token || "");
  const orders = useSelector((state) => state.orders?.orders);
  useEffect(() => {
    dispatch(fetchAllOrders(token));
  }, [dispatch, token]);

  // sort array by status
  const sortedOrders = orders
    .slice()
    .sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    })
    .map((order) => {
      // date
      const date = new Date(order?.created_at);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const newDate = date.toLocaleDateString("vi-VN", options);
      const price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(order?.total_price);

      return {
        id_order: order._id,
        id_row: order._id.slice(0, 12),
        key: order._id,
        createdAt: newDate,
        phone: order.phone,
        totalPrice: price,
        status: order.status,
        order_details: order.order_detail,
      };
    });

  const resetEditing = () => {
    setIsEditing(false);
  };

  const expandedRowRender = (record) => {
    const newArr = record?.order_details?.map((item) => {
      // price viet name format
      const price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item?.price);

      // random id
      const randomId = Math.floor(Math.random() * 1000000000000000000);

      return {
        key: item.product_id + randomId,
        img: item.product.images[0].image_url,
        name: item.product.name,
        price: price,
        quantity: item.quantity,
        color: color[item.color],
        size: item.size,
      };
    });
    const columns = [
      // img
      {
        title: "Hình sản phẩm",
        dataIndex: "img",
        key: "img",
        render: (img) => <img width={100} src={img} alt="img" />,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Giá tiền",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Màu sắc",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Kích cỡ",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Số lượng ",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];

    return <Table columns={columns} dataSource={newArr} pagination={false} />;
  };

  const updateStatus = (record) => {
    setIsEditing(true);
    setIdOrder(record.id_order);

    // dispatch(
    //   updateOrderStatus({
    //     status: 1,
    //     id_order: record.id_order,
    //     token,
    //     toast,
    //   })
    // );
  };
  const deleteOrder = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn hủy đơn hàng này không?",
      content: "Đơn hàng này sẽ bị hủy",
      okText: "Hủy đơn hàng",
      cancelText: "Hủy",
      onOk() {
        dispatch(
          updateOrderStatus({
            status: 2,
            id_order: record.id_order,
            token,
            toast,
          })
        );
      },
    });
  };

  const onChangeSelect = (value, record) => {
    setStatus(value);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id_row",
      key: "id_row",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color, text;
        if (status === 0) {
          color = "orange";
          text = " Đang xử lí";
        } else if (status === 1) {
          color = "green";
          text = "Đơn hàng đã được duyệt - đang chờ đóng gói";
        } else if (status === 2) {
          color = "yellow";
          text = "Đang giao hàng";
        } else if (status === 3) {
          color = "blue";
          text = "Đã giao hàng";
        } else if (status === 4) {
          color = "red";
          text = "Giao hàng không thành công";
        } else if (status === 5) {
          color = "red";
          text = "Đơn hàng bị hủy";
        }
        return (
          <Badge
            status={color}
            text={text}
            style={{ width: "100%", textAlign: "center" }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      render: (record) => {
        return (
          <>
            {record.status !== 5 && record.status !== 3 && (
              <CheckOutlined
                onClick={() => {
                  updateStatus(record);
                }}
              />
            )}

            {record.status !== 5 && record.status !== 3 && (
              <CloseOutlined
                onClick={() => {
                  deleteOrder(record);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="ml-[180px] p-4">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={sortedOrders}
      />
      <Modal
        title="Kiểm duyệt đơn hàng"
        visible={isEditing}
        width={"70%"}
        okText="Lưu"
        // confirmLoading={isLoading}
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          dispatch(
            updateOrderStatus({
              status: status,
              id_order: idOrder,
              token,
              toast,
            })
          );
          resetEditing();
        }}
      >
        <Form.Item label="Trạng thái">
          <Select placeholder="Trạng thái" onChange={onChangeSelect}>
            <Option key={1} value={1}>
              Duyệt đơn hàng
            </Option>
            <Option key={2} value={2}>
              Đang giao hàng
            </Option>
            {/* <Option key={3} value={3}>
              Giao hàng thành công
            </Option>
            <Option key={4} value={4}>
              Giao hàng không thành công
            </Option>
            <Option key={5} value={5}>
              Hủy đơn hàng
            </Option> */}
          </Select>
        </Form.Item>
      </Modal>
    </div>
  );
};
export default Orders;
