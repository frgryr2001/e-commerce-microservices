import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/authentication/authSlice";
import classes from "./Profile.module.css";
import { toast } from "react-toastify";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [form, setForm] = useState({
    fullname: user?.fullname,
    phone: user?.phone,
    address: user?.address,
  });
  const onChangeInputHandle = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(updateUser({ user: form, token, toast }));
  };
  return (
    <>
      <div className={classes.container}>
        <form>
          <div className={classes["img-container"]}>
            <div>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                className={classes.img}
              />
            </div>
            {/* <img></img> */}
          </div>
          <div className={classes.mb6}>
            <label htmlFor="fullname" className={classes.label}>
              Họ & Tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={classes.input}
              placeholder="Nguyễn Trung Tín"
              value={form.fullname}
              onChange={onChangeInputHandle}
              required
            />
          </div>
          <div className={classes.mb6}>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={classes.input}
              placeholder="name@gmail.com"
              value={user?.email || ""}
              disabled
              onChange={onChangeInputHandle}
              required
            />
          </div>
          <div className={classes.mb6}>
            <label htmlFor="fullname" className={classes.label}>
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              className={classes.input}
              placeholder="Tp HCM"
              value={form.address}
              onChange={onChangeInputHandle}
              required
            />
          </div>
          <div className={classes.mb6}>
            <label htmlFor="fullname" className={classes.label}>
              Số điện thoại
            </label>
            <input
              type="number"
              name="phone"
              className={classes.input}
              value={form.phone}
              placeholder="090 34512 3112"
              onChange={onChangeInputHandle}
              required
            />
          </div>

          <button
            type="submit"
            className={classes.btn}
            onClick={onSubmitHandle}
          >
            Chỉnh sửa
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
