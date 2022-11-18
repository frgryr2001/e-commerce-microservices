import React, { useEffect } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Layouts/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
let isInitial = true;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login({ data, toast, navigate }));
  };

  return (
    <div className={classes.body__login}>
      <div className={classes.card}>
        <form onSubmit={onSubmit}>
          <h2 className={classes.title}> Đăng nhập </h2>

          <p className={classes.or}>
            <span>ADMIN</span>
          </p>

          <div>
            <div className={classes.input__login}>
              <input
                type="text"
                id="username"
                required
                className={classes.input}
                name="email"
                value={email}
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="username">
                Email
              </label>
            </div>
          </div>

          <div>
            <div className={classes.input__login}>
              <input
                type="password"
                id="password"
                required
                className={classes.input}
                value={password}
                name="password"
                onChange={onChange}
              />
              <label className={classes.input__label} htmlFor="password">
                Password
              </label>
            </div>
          </div>
          {/* {isError && <p className={classes.error}>{message}</p>} */}

          <button className={classes.cta__btn}>Đăng nhập</button>
        </form>
      </div>
      {/* {isLoading && <Spinner />} */}
    </div>
  );
};

export default Login;
