import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import ListPromotion from "../ListPromotion";
const { RangePicker } = DatePicker;

const Promotion = () => {
  return (
    <div className="ml-[180px] mt-[100px]">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
      >
        <Form.Item label="Thêm mã khuyến mãi">
          <Input />
        </Form.Item>
        <Form.Item label="Giá trị">
          <Input />
        </Form.Item>
        <Form.Item label="Hạn sử dụng">
          <RangePicker />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary">Tạo </Button>
        </Form.Item>
      </Form>
      <ListPromotion />
    </div>
  );
};
export default Promotion;
