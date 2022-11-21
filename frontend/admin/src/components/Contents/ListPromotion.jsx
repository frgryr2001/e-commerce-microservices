import { Table, Space, Modal, Form, Input, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVoucher,
  getAllVouchers,
  updateVoucher,
} from "../../redux/Voucher/voucherSlice";
import moment from "moment";
const { RangePicker } = DatePicker;

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ListPromotion = () => {
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  const columns = [
    {
      title: "Mã khuyến mãi",
      dataIndex: "code",
    },
    {
      title: "Giá trị",
      dataIndex: "discount",
    },
    {
      title: "Đến ngày",
      dataIndex: "expiredDate",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },

    // action
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              style={{ color: "blue" }}
              onClick={() => {
                onEditing(record);
              }}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => {
                onDelete(record);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const data = useSelector((state) => state.voucher?.voucher);

  const [form, setForm] = useState({
    id: "",
    code: "",
    discount: "",
    expiredDate: [],
    amount: "",
  });

  const newData = data.map((item, index) => {
    // convert date yyyy-mm-dd
    const date = new Date(item.expiredDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDate = `${day}-${month}-${year}`;

    // check item.expiredDate < today => disable
    const today = new Date();
    const expiredDate = new Date(item.expiredDate);
    const isExpired = today > expiredDate;

    return {
      key: item._id,
      ...item,
      discount: `${item.discount}%`,
      expiredDate: newDate,
    };
  });
  useEffect(() => {
    dispatch(getAllVouchers());
  }, [dispatch]);
  const resetEditing = () => {
    setIsEditing(false);
  };
  const onEditing = (record) => {
    console.log(typeof record.expiredDate);
    const date = record.expiredDate.split("-");
    const newDate = `${date[2]}-${date[1]}-${date[0]}`;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const newToday = `${year}-${month}-${day}`;
    setIsEditing(true);
    setForm({
      id: record._id,
      code: record.code,
      discount: record.discount.split("%")[0],
      expiredDate: [moment(newToday), moment(newDate)],
      amount: record.amount,
    });
  };
  const onDelete = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa?",
      content: "Xóa mã khuyến mãi này",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(deleteVoucher({ id: record._id, toast, token }));
      },
    });
  };
  const inputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Table columns={columns} dataSource={newData} onChange={onChange} />
      <Modal
        title="Chỉnh sửa danh mục"
        visible={isEditing}
        width={"70%"}
        okText="Lưu"
        // confirmLoading={isLoading}
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          const date = form.expiredDate[1]._d;
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const newDate = `${year}-${month}-${day}`;
          form.expiredDate = newDate;
          dispatch(
            updateVoucher({
              data: {
                code: form.code,
                discount: form.discount,
                expiredDate: form.expiredDate,
                amount: form.amount,
              },
              toast,
              id: form.id,
              token,
            })
          );
          resetEditing();
        }}
      >
        <Form.Item label="Thêm mã khuyến mãi">
          <Input value={form.code} onChange={inputChange} name="code" />
        </Form.Item>
        <Form.Item label="Giá trị">
          <Input value={form.discount} onChange={inputChange} name="discount" />
        </Form.Item>
        <Form.Item label="Số lượng">
          <Input value={form.amount} onChange={inputChange} name="amount" />
        </Form.Item>
        <Form.Item label="Hạn sử dụng">
          <RangePicker
            value={form.expiredDate}
            name="expiredDate"
            // get value start date and end date
            onChange={(value) => {
              setForm({
                ...form,
                expiredDate: value,
              });
            }}
          />
        </Form.Item>
      </Modal>
    </>
  );
};
export default ListPromotion;
