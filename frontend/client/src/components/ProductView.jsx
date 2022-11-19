import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove } from "../redux/product-modal/productModalSlice";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";
import { toast } from "react-toastify";
const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  if (product === undefined)
    product = {
      name: "",
      price: "",
      images: [],
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };

  const [previewImg, setPreviewImg] = useState(product.images[0]?.image_url);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.images[0]?.image_url);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      toast.error("Vui lòng chọn màu sắc");
      return false;
    }

    if (size === undefined) {
      toast.error("Vui lòng chọn kích cỡ");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      // find id product option by color and size
      const productOption = product.product_options.find(
        (option) =>
          option.color === color && option.size === size && option.quantity > 0
      );

      let newItem = {
        id: product._id,
        id_productOption: productOption._id,
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        toast.success("Thêm vào giỏ hàng thành công!");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại!");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      // find id product option by color and size
      const productOption = product.product_options.find(
        (option) =>
          option.color === color && option.size === size && option.quantity > 0
      );

      let newItem = {
        id: product._id,
        id_productOption: productOption._id,
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        props.history.push("/cart");
      } else {
        alert("Fail");
      }
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.images[0]?.image_url)}
          >
            <img src={product.images[0]?.image_url} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.images[1]?.image_url)}
          >
            <img src={product.images[1]?.image_url} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" width={"95%"} />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.name}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {/* {product.product_options?.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item.color ? "active" : ""
                }`}
                onClick={() => setColor(item.color)}
              >
                <div className={`circle bg-${item.color}`}></div>
              </div>
            ))} */}

            {product.product_options
              ?.filter((item, index, arr) => {
                return (
                  arr.findIndex((t) => {
                    return t.color === item.color;
                  }) === index
                );
              })
              .map((item, index) => (
                <div
                  key={index}
                  className={`product__info__item__list__item ${
                    color === item.color ? "active" : ""
                  }`}
                  onClick={() => setColor(item.color)}
                >
                  <div className={`circle bg-${item.color}`}></div>
                </div>
              ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.product_options
              ?.filter((item, index, arr) => {
                return (
                  arr.findIndex((t) => {
                    return t.size === item.size;
                  }) === index
                );
              })
              .map((item, index) => (
                <div
                  key={index}
                  className={`product__info__item__list__item ${
                    size === item.size ? "active" : ""
                  }`}
                  onClick={() => setSize(item.size)}
                >
                  <span className="product__info__item__list__item__size">
                    {item.size}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
