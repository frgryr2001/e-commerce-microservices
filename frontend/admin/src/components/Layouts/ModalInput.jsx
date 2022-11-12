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
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default function ModalWithForm() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={showModal}>Add Product</Button>
      <Modal
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width="70%"
      >
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
                label="Name"
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
              <Form.Item name={["url"]} label="URL">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
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
              <Form.Item label="Price">
                <Form.Item name="price" noStyle>
                  <InputNumber min={0} />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label="Min balance">
                <Form.Item name="min-balance" noStyle>
                  <InputNumber min={0} />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name={["location"]} label="Location">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="network"
                label="Network"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select the Network",
                  },
                ]}
              >
                <Select placeholder="net1">
                  <Option value="net1"> Network 1 </Option>
                  <Option value="net2"> Network 2 </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              {" "}
              <Form.Item label="Minimum amount">
                <Form.Item name="min-offer-amount" noStyle>
                  <InputNumber min={0} />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="device-image"
                label="Device image"
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
      </Modal>
    </>
  );
}
