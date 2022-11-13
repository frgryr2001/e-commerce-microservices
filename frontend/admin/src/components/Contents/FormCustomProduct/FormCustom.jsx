import { useState } from "react";
import React from "react";

import {
  Form,
  Select,
  InputNumber,
  Input,
  Button,
  Upload,
  Space,
  Modal,
} from "antd";
import { Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// textArea

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const FormCustom = ({ form, onFinish }) => {
  return (
    <Form
      form={form}
      name="new-device-form"
      {...formItemLayout}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Row>
        <Col span={12}>
          <Form.Item
            name={["name"]}
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["description"]} label="Mô tả">
            <TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="category"
            label="Danh mục"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select the type of your device!",
              },
            ]}
          >
            <Select placeholder="Producer">
              <Option value="producer"> Producer </Option>
              <Option value="consumer"> Consumer </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Giá tiền">
            <Form.Item name="price" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label="Số lượng">
            <Form.Item name="quantity" noStyle>
              <InputNumber min={0} />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item name={["sizes"]} label="Kích cỡ">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="manufacturer"
            label="Nhà sản xuất"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà sản xuất!",
              },
            ]}
          >
            <Select placeholder="Adidas">
              <Option value="Adidas"> Adidas </Option>
              <Option value="Nike"> Nike </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            // name="device-image"
            name="images"
            label="Hình trưng bày"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="No file selected"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Select file
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormCustom;
