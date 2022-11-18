import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

import productData from "../utils/products";
import numberWithCommas from "../utils/numberWithCommas";
import useDebounce from "../utils/useDebounce";
import { getVoucherByCode } from "../redux/Voucher/voucherSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);
  const productList = useSelector((state) => state.products?.products || []);
  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems, productList)
  );
  const [voucherText, setVoucherText] = useState("");

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems, productList));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  // voucher
  const voucher = useSelector((state) => state.voucher?.voucher);

  useEffect(() => {
    dispatch(getVoucherByCode(voucherText));
  }, [voucherText]);
  const debounce = useDebounce();
  const handleInputChange = (e) => {
    const text = e.target.value;
    debounce(() => {
      setVoucherText(text);
    }, 1000);
  };

  return (
    <Helmet title="Giỏ hàng">
      <div className=" cart">
        <div className="cart__info">
          <div className="cart__info__voucher">
            <label htmlFor="voucher">Voucher :</label>
            <input
              type="text"
              id="voucher"
              name="voucher"
              placeholder="Mã giảm giá"
              onChange={handleInputChange}
            />
          </div>
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Link to="/checkout" style={{ marginBottom: "20px" }}>
              <Button size="block">Đặt hàng</Button>
            </Link>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
