import { Table } from "antd";
import React from "react";
const columns = [
  {
    title: "Mã khuyến mãi",
    dataIndex: "voucher",
  },
  {
    title: "Giá trị",
    dataIndex: "value",
  },
  {
    title: "Thời hạn còn lại",
    dataIndex: "time",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    filters: [
      {
        text: "Đang hoạt động",
        value: "Đang hoạt động",
      },
      {
        text: "Đã hết hạn",
        value: "Đã hết hạn",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    defaultFilteredValue: ["Đang hoạt động"],
  },
];
const data = [
  {
    key: "1",
    voucher: "ABCD123",
    value: "10%",
    time: "2h30",
    status: "Đang hoạt động",
  },
  {
    key: "2",
    voucher: "ABCD123",
    value: "10%",
    time: "2h30",
    status: "Đã hết hạn",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const ListPromotion = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
export default ListPromotion;
