import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Button, Modal } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersByUser,
  updateOrderStatusUser,
} from "../redux/Orders/orderSlice";
// import axios from "axios";
import { toast } from "react-toastify";
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

const TableHisPayment = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user?.token);

  const expandedRowRender = (record) => {
    const newArr = record?.order_details?.map((item) => {
      // price viet name format
      const price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item?.price);

      return {
        key: item.product_id,
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

  useEffect(() => {
    if (token) {
      dispatch(getOrdersByUser(token));
    }
  }, [token, dispatch]);

  const orders = useSelector((state) => state.orders?.order || []);
  const newOrders = orders?.map((order) => {
    const price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order?.total_price);

    // date format vietnamese
    const date = new Date(order?.created_at);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const newDate = date.toLocaleDateString("vi-VN", options);

    return {
      id_order: order._id,
      key: order._id,
      createdAt: newDate,
      totalPrice: price,
      status: order.status,
      address: order.address,
      order_details: order.order_detail,
    };
  });

  const onCancelOrder = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn hủy đơn hàng này không?",
      content: "Hủy đơn hàng",
      okText: "Hủy đơn hàng",
      cancelText: "Hủy",
      onOk() {
        dispatch(
          updateOrderStatusUser({
            status: 5,
            id_order: record.id_order,
            token,
            toast,
          })
        );
      },
    });
  };
  const onConfirmOrder = (record) => {
    dispatch(
      updateOrderStatusUser({
        status: 3,
        id_order: record.id_order,
        token,
        toast,
      })
    );
  };
  const onNotConfirmOrder = (record) => {
    dispatch(
      updateOrderStatusUser({
        status: 4,
        id_order: record.id_order,
        token,
        toast,
      })
    );
  };
  const onReOrder = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn đặt lại đơn hàng này không?",
      content: "Đặt lại đơn hàng",
      okText: "Đặt lại đơn hàng",
      cancelText: "Hủy",
      onOk() {
        dispatch(
          updateOrderStatusUser({
            status: 0,
            id_order: record.id_order,
            token,
            toast,
          })
        );
      },
    });
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id_order",
      key: "id_order",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "address",
      key: "address",
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
        let color = "";
        let text = "";
        if (status === 0) {
          color = "orange";
          text = "Đang chờ xác nhận";
        } else if (status === 1) {
          color = "yellow";
          text = "Đã xác nhận đơn hàng";
        } else if (status === 2) {
          color = "lime";
          text = "Đang giao hàng";
        } else if (status === 3) {
          color = "green";
          text = "Đã nhận được hàng";
        } else if (status === 4) {
          color = "purple";
          text = "Chưa nhận được hàng";
        } else if (status === 5) {
          color = "red";
          text = "Đã hủy";
        }
        return <Badge color={color} text={text} />;
      },
    },
    {
      // button
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space wrap>
          {record.status === 0 && (
            <>
              <Button
                type="primary"
                danger
                onClick={(e) => {
                  e.preventDefault();

                  onCancelOrder(record);
                }}
              >
                Hủy đơn hàng
              </Button>
            </>
          )}
          {record.status === 2 && (
            <>
              <Button
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onConfirmOrder(record);
                }}
              >
                Đã nhận được hàng
              </Button>
              <Button
                danger
                onClick={(e) => {
                  e.preventDefault();

                  onNotConfirmOrder(record);
                }}
              >
                Chưa nhận được hàng
              </Button>
            </>
          )}
          {record.status === 5 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onReOrder(record);
              }}
            >
              Đặt lại đơn hàng
            </Button>
          )}
        </Space>
      ),
    },
  ];
  console.log("newOrders", newOrders);
  return (
    <div className="ml-[180px] p-4">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
          // close when click on other row
          // expandRowByClick: true,
        }}
        dataSource={newOrders || []}
      />
    </div>
  );
};
export default TableHisPayment;
