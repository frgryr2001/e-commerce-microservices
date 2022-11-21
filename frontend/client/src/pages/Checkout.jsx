import React, { useCallback, useEffect } from "react";
import SelectOption from "../components/SelectOption";
import classes from "./Checkout.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/Orders/orderSlice";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
const Checkout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      console.log("token", token);
      history.push("/login");
    }
  }, [token, history]);
  const [provinceList, setProvinceList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [wardList, setWardList] = React.useState([]);
  const [provinceChoice, setProvinceChoice] = React.useState(0);
  const [districtChoice, setDistrictChoice] = React.useState(0);
  const [wardChoice, setWardsChoice] = React.useState(0);
  const [costShip, setCostShip] = React.useState(0);
  const addressRef = React.useRef();

  const [check, setCheck] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const fetchProvinceAPI = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_GHN}/province`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          token: "61571068-6961-11ed-b190-ea4934f9883e",
        },
      });
      const data = await res.data;

      return data;
    };
    const dataSet = await fetchProvinceAPI();
    setProvinceList(dataSet.data);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const fetchDistrictAPI = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_GHN}/district`,
        {
          province_id: provinceChoice,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            token: "61571068-6961-11ed-b190-ea4934f9883e",
          },
        }
      );
      const data = await res.data;

      return data;
    };
    const dataSet = await fetchDistrictAPI();
    setDistrictList(dataSet.data);
  }, [provinceChoice]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (districtChoice !== 0) {
      const fetchDistrictAPI = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_GHN}/ward?district_id=${districtChoice}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              token: "61571068-6961-11ed-b190-ea4934f9883e",
            },
          }
        );
        const data = await res.data;

        return data;
      };
      const dataSet = await fetchDistrictAPI();
      setWardList(dataSet.data);
    }
  }, [districtChoice]);

  const cartItems = useSelector((state) => state.cartItems.value || []);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // total quantity
  const totalQuantity = cartItems?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  // call tính phí vận chuyển
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFeeShip = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ORDER_URL}/shipping-fees`,
        {
          district_id: districtChoice * 1,
          ward_id: `${wardChoice}`,
          quantity: totalQuantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      setCostShip(data.shipping_fee);
      return data.shipping_fee;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (provinceChoice && districtChoice !== 0 && wardChoice !== 0) {
      fetchFeeShip();
    }
  }, [provinceChoice, districtChoice, wardChoice, fetchFeeShip]);

  const listProvinceIdName = provinceList?.map((item) => {
    return { value: item.ProvinceID, label: item.ProvinceName };
  });
  const listDistrictIdName = districtList?.map((item) => {
    return { value: item.DistrictID, label: item.DistrictName };
  });
  const listWardIdName = wardList?.map((item) => {
    return { value: item.WardCode, label: item.WardName };
  });

  const code = useSelector((state) => state.voucher?.voucher?.code || "");
  const discount = useSelector(
    (state) => state.voucher?.voucher?.discount || ""
  );

  const user = useSelector((state) => state.user?.user);

  const newCartProduct = cartItems.map((item) => {
    return {
      product_id: item.id,
      product_option_id: item.id_productOption,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size,
    };
  });

  const onPaymentClick = () => {
    const address = addressRef.current.value;
    const order = {
      province_id: provinceChoice,
      district_id: districtChoice,
      ward_id: wardChoice,
      address: address,
      voucher_code: code || "",
      products: newCartProduct,
    };
    dispatch(createOrder({ order, token, toast, dispatch, setCheck }));
  };

  return (
    <div className={classes.row}>
      {check && (
        <div>
          {/* đặt hàng thành công */}
          <p className={classes.success}>Đặt hàng thành công</p>
          <Link to="/catalog">Tiếp tục mua hàng</Link>
        </div>
      )}
      {!check && (
        <>
          <div className={classes["col-50"]}>
            <div className={classes.container}>
              <form action="/action_page.php">
                <div className={classes.row}>
                  <div className={classes["col-50"]}>
                    voucher: {code}
                    <h3>Hóa đơn địa chỉ </h3>
                    <label htmlFor="fname">Họ tên</label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      defaultValue={user?.fullname}
                      readOnly
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      defaultValue={user?.email}
                      readOnly
                    />
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      // value={user.phone}
                      defaultValue={user?.phone}
                      readOnly
                    />
                    <label htmlFor="adr">Địa chỉ</label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      ref={addressRef}
                    />
                  </div>

                  <div className={classes["col-50"]}>
                    <h3>Địa chỉ</h3>

                    <label htmlFor="cname">Tỉnh</label>
                    <SelectOption
                      listProvinceIdName={listProvinceIdName}
                      setProvinceChoice={setProvinceChoice}
                    />
                    <label htmlFor="ccnum">Quận/Huyện</label>
                    <SelectOption
                      listDistrictIdName={listDistrictIdName}
                      setDistrictChoice={setDistrictChoice}
                    />
                    <label htmlFor="expmonth">Xã</label>
                    <SelectOption
                      listWardIdName={listWardIdName}
                      setWardsChoice={setWardsChoice}
                    />
                  </div>
                </div>

                <input
                  value="Thanh toán"
                  className={classes.btn}
                  onClick={onPaymentClick}
                  style={{ textAlign: "center" }}
                />
              </form>
            </div>
          </div>
          <div className={classes["col-50"]}>
            <div className={classes.container}>
              <h4>
                Cart
                <span className={classes.price} style={{ color: "black" }}>
                  <ShoppingCartOutlined />
                  <b>{totalQuantity}</b>
                </span>
              </h4>

              {cartItems.map((item) => {
                return (
                  <p>
                    <a href={`/catalog/${item.slug}`}>
                      {item.slug}-{item.color}-{item.size} x {item.quantity}
                    </a>{" "}
                    <span className={classes.price}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}{" "}
                    </span>
                  </p>
                );
              })}

              <hr />
              <p>
                Tổng tiền{" "}
                <span className={classes.price} style={{ color: "black" }}>
                  <b>
                    {
                      // total to VND price
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)
                    }
                  </b>
                </span>
              </p>

              <p>
                Tiền giảm{" "}
                <span className={classes.price} style={{ color: "black" }}>
                  <b>
                    {
                      // total to VND price
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format((total * discount) / 100)
                    }
                  </b>
                </span>
              </p>
              <p>
                Tiền vận chuyển{" "}
                <span className={classes.price} style={{ color: "black" }}>
                  <b>
                    {
                      // total to VND price
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(costShip)
                    }
                  </b>
                </span>
              </p>
              <p>
                Thành tiền{" "}
                <span className={classes.price} style={{ color: "black" }}>
                  <b>
                    {
                      // total to VND price
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total - (total * discount) / 100 + costShip)
                    }
                  </b>
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
