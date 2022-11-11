import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/images/SOA.png";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              {/* search input */}
              <div className="header__menu__search ">
                {/* <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="header__menu__search__input"
                /> */}

                <i className="bx bx-search"></i>
              </div>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item header__menu__icon">
              <i className="bx bx-user "></i>
              {/* ul li */}
              <div className="header__menu__user">
                <ul className="header__menu__list">
                  {!isAuthenticated && (
                    <li style={{ padding: "10px 0px" }}>
                      <Link to="/login" className="header__menu__list__item">
                        Đăng nhập
                      </Link>
                    </li>
                  )}

                  {isAuthenticated && (
                    <li style={{ padding: "10px 0px" }}>
                      <Link to="/profile" className="header__menu__list__item">
                        Thông tin cá nhân
                      </Link>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li style={{ padding: "10px 0px" }}>
                      <Link
                        to="/purchase-history"
                        className="header__menu__list__item"
                      >
                        Lịch sử mua hàng
                      </Link>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li style={{ padding: "10px 0px" }}>
                      <Link to="/logout" className="header__menu__list__item">
                        Đăng xuất
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
