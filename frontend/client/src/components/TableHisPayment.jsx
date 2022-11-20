import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../redux/Orders/orderSlice";
import axios from "axios";

const TableHisPayment = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user?.token);
  const expandedRowRender = (record) => {
    console.log(record);
    const columns = [
      // img
      {
        title: "Hình sản phẩm",
        dataIndex: "img",
        key: "img",
        render: (img) => (
          <img
            width={100}
            src="https://i0.wp.com/epthinktank.eu/wp-content/uploads/2021/09/EPRS-Briefing-698028-General-product-safety-regulation-FINAL.png?fit=1000%2C666&ssl=1"
            alt="img"
          />
        ),
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
    const data = [];
    for (let i = 0; i < record.order_details.length; ++i) {
      data.push({
        key: i.toString(),
        quantity: "10",
        name: "This is production name",
        price: record.order_details[i].price,
        color: record.order_details[i].color,
        size: record.order_details[i].size,
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  useEffect(() => {
    if (token) {
      dispatch(getOrdersByUser(token));
    }
  }, [token, dispatch]);

  const orders = useSelector((state) => state.orders?.order || []);
  const newOrders = orders?.map((order) => {
    return {
      id_order: order._id,
      key: order._id,
      createdAt: order.createdAt,
      totalPrice: order.total_price,
      status: order.status,
      order_details: order.order_detail,
    };
  });

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
          text = "Đang xử lý";
        } else if (status === 1) {
          color = "yellow";
          text = "Đã xác nhận";
        } else if (status === 2) {
          color = "green";
          text = "Đang giao hàng";
        } else if (status === 3) {
          color = "green";
          text = "Đã giao hàng";
        } else if (status === 4) {
          color = "red";
          text = "Đã hủy";
        }
        return <Badge color={color} text={text} />;
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
          // close when click on other row
          expandRowByClick: true,
        }}
        dataSource={newOrders}
      />
    </div>
  );
};
export default TableHisPayment;
