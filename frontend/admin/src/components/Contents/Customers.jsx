import React from "react";
import { Table, Space, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
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
const columns = [
  {
    title: "Họ & Tên",
    width: 80,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },

  {
    title: "SĐT",
    dataIndex: "phoneNumber",
    key: "1",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "2",
    width: 150,
  },
  {
    title: "Số đơn hàng",
    dataIndex: "orders",
    key: "3",
    width: 150,
  },

  {
    title: "Thao tác",
    key: "operation",
    fixed: "right",
    width: 50,
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
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Nguyễn Văn ${i}`,
    orders: 32,
    phoneNumber: `0904728${i}`,
    email: `email${i}.com`,
  });
}
const Customer = () => {
  return (
    <div className="min-h-screen ml-[180px] p-10">
      <h1 className="text-[35px] font-bold text-gray-700 mb-0">
        Quản Lý Khách Hàng
      </h1>
      <div className="flex  mt-8">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1500,
            y: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default Customer;
