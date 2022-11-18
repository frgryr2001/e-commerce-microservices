import React from "react";
import SelectOption from "../components/SelectOption";
import classes from "./Checkout.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
const Checkout = () => {
  return (
    <div className={classes.row}>
      <div className={classes["col-75"]}>
        <div className={classes.container}>
          <form action="/action_page.php">
            <div className={classes.row}>
              <div className={classes["col-50"]}>
                <h3>Hóa đơn địa chỉ</h3>
                <label for="fname">Họ tên</label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="John M. Doe"
                />
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                />
                <label for="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="012..."
                />
                <label for="adr">Địa chỉ</label>
                <input
                  type="text"
                  id="adr"
                  name="address"
                  placeholder="542 W. 15th Street"
                />
              </div>

              <div className={classes["col-50"]}>
                <h3>Địa chỉ</h3>

                <label for="cname">Tỉnh</label>
                <SelectOption />
                <label for="ccnum">Quận/Huyện</label>
                <SelectOption />
                <label for="expmonth">Xã</label>
                <SelectOption />
              </div>
            </div>

            <input type="submit" value="Thanh toán" className={classes.btn} />
          </form>
        </div>
      </div>

      <div className={classes["col-25"]}>
        <div className={classes.container}>
          <h4>
            Cart
            <span className={classes.price} style={{ color: "black" }}>
              <ShoppingCartOutlined />
              <b>4</b>
            </span>
          </h4>
          <p>
            <a href="#">Product 1</a> <span className={classes.price}>$15</span>
          </p>
          <p>
            <a href="#">Product 2</a> <span className={classes.price}>$5</span>
          </p>
          <p>
            <a href="#">Product 3</a> <span className={classes.price}>$8</span>
          </p>
          <p>
            <a href="#">Product 4</a> <span className={classes.price}>$2</span>
          </p>
          <hr />
          <p>
            Total{" "}
            <span className={classes.price} style={{ color: "black" }}>
              <b>$30</b>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
