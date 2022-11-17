import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import ListPromotion from "../ListPromotion";
import { useDispatch } from "react-redux";
import { createVoucher } from "../../../redux/Voucher/voucherSlice";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;

const Promotion = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isEditing, setIsEditing] = useState(false);
  const onFinish = (values) => {
    const endDate = values.expiredDate[1].format("YYYY-MM-DD"); // here
    values.expiredDate = endDate;
    dispatch(createVoucher({ data: values, form, toast }));
  };
  console.log("values");

  return (
    <div className="ml-[180px] mt-[100px]">
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="Thêm mã khuyến mãi" name="code">
          <Input />
        </Form.Item>
        <Form.Item label="Giá trị" name="discount">
          <Input />
        </Form.Item>
        <Form.Item label="Số lượng" name="amount">
          <Input />
        </Form.Item>
        <Form.Item label="Hạn sử dụng" name="expiredDate">
          <RangePicker />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit">
            Tạo{" "}
          </Button>
        </Form.Item>
      </Form>
      <ListPromotion />
    </div>
  );
};
export default Promotion;
