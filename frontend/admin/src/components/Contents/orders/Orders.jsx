import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import React from "react";
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
const Orders = () => {
  const expandedRowRender = () => {
    const columns = [
      // img
      {
        title: "Hình sản phẩm",
        dataIndex: "img",
        key: "img",
        render: (text) => (
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
        title: "Số lượng ",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        quantity: "10",
        name: "This is production name",
        price: "1.000.000 VNĐ",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "idorder",
      key: "idorder",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Action",
      key: "operation",
      render: () => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const data = [];

  data.push({
    key: 1,
    idorder: "Đơn hàng 1",
    createdAt: "2014-12-24 23:12:00",
    email: "nhanle.lx@gmail.com",
    status: "ok",
    totalPrice: "1.000.000 VNĐ",
  });
  return (
    <div className="ml-[180px] p-4">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={data}
      />
    </div>
  );
};
export default Orders;
