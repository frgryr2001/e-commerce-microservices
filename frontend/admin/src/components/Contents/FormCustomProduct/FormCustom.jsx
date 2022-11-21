import { useCallback, useEffect, useRef, useState } from "react";
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
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
// textArea

const { TextArea } = Input;
const { Option } = Select;

const colorOptionProduct = {
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

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const FormCustom = ({
  form,
  onFinish,
  optionsProduct,
  setOptionsProduct,
  product,
}) => {
  const sizeText = useRef();
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const quantityText = useRef();
  const categories = useSelector(
    (state) => state.categories?.categoryName || []
  );

  useEffect(() => {
    form.setFieldsValue(product);
  }, [form, product]);
  if (product) {
    optionsProduct = product?.product_options;
  }

  const handleChange = useCallback((value) => {
    setColor(value);
  }, []);

  const createOptionProduct = () => {
    if (color && sizeText.current && quantityText.current) {
      const option = {
        color,
        size: sizeText.current.input.value,
        quantity: quantityText.current.value,
      };
      // check option exist up quantity
      const index = optionsProduct.findIndex(
        (item) => item.color === option.color && item.size === option.size
      );
      if (index !== -1) {
        optionsProduct[index].quantity =
          optionsProduct[index].quantity * 1 + option.quantity * 1;
      } else {
        optionsProduct.push(option);
      }
      setOptionsProduct([...optionsProduct]);

      // setOptionsProduct([...optionsProduct, option]);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin kích cỡ và số lượng , màu");
    }
  };
  return (
    <Form
      form={form}
      name="new-device-form"
      {...formItemLayout}
      onFinish={onFinish}
      hideRequiredMark

      // fields={[
      //   {
      //     name: ["name"],
      //     value: name,
      //   },
      //   {
      //     name: ["price"],
      //     value: product?.price,
      //   },
      //   {
      //     name: ["description"],
      //     value: product?.description,
      //   },
      //   {
      //     name: ["categories"],
      //     value: product?.category,
      //   },
      //   // {
      //   //   name: ["images"],
      //   //   value: product?.images,
      //   // },
      //   {
      //     name: ["manufacturer"],
      //     value: product?.manufacture,
      //   },
      // ]}
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
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <Select placeholder="Danh mục">
              {categories.map((category) => {
                return (
                  <Option key={category._id} value={category._id}>
                    {category.slug}
                  </Option>
                );
              })}
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
              <InputNumber min={0} ref={quantityText} />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item name="color" label="Color" hasFeedback>
            <Select
              placeholder="Đen"
              onChange={handleChange}
              defaultActiveFirstOption
            >
              <Option value="black"> Đen </Option>
              <Option value="pink"> Hồng </Option>
              <Option value="white"> Trắng </Option>
              <Option value="yellow"> Vàng </Option>
              <Option value="orange"> Cam </Option>
              <Option value="blue"> Xanh dương </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item name={["sizes"]} label="Kích cỡ">
            <Input ref={sizeText} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="manufacture"
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
              <Option value="Puma"> Puma </Option>
              <Option value="Fila"> Fila </Option>
              <Option value="Converse"> Converse </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={createOptionProduct}
          >
            Tạo
          </Button>
          {/* ui li */}
          <ul style={{ marginLeft: "130px" }}>
            {!product &&
              optionsProduct?.map((option, index) => {
                return (
                  <li key={index} className="flex items-center gap-5">
                    <span>
                      Màu : {colorOptionProduct[option.color]} - Kích cỡ:{" "}
                      {option.size} - Số lượng: {option.quantity}
                    </span>

                    <DeleteOutlined
                      style={{ color: "red" }}
                      className="cursor-pointer"
                      onClick={() => {
                        const newOptions = optionsProduct.filter(
                          (item, idx) => idx !== index
                        );
                        setOptionsProduct(newOptions);
                      }}
                    />
                  </li>
                );
              })}
            {product &&
              optionsProduct.map((option, index) => {
                return (
                  <li key={index} className="flex items-center gap-5">
                    <span>
                      Màu : {option.color} - Kích cỡ: {option.size} - Số lượng:
                      {option.quantity}
                    </span>

                    <DeleteOutlined
                      style={{ color: "red" }}
                      className="cursor-pointer"
                      onClick={() => {
                        const newOptions = optionsProduct.filter(
                          (item, idx) => idx !== index
                        );
                        setOptionsProduct(newOptions);
                      }}
                    />
                  </li>
                );
              })}
          </ul>
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
            <Upload name="logo" listType="picture">
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
