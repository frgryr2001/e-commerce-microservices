import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { FiCodesandbox } from "react-icons/fi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { FaSalesforce } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
const SideBar = () => {
  let navigate = useNavigate();

  const handleClickActive = (e) => {
    // Toggle isActive state on click
    /* == Active attribute == */
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink(e) {
      linkColor.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.toggle("active");
    }
    linkColor.forEach((item) => colorLink(e));
  };

  const onLogout = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="container" id="navbar">
      <nav className="nav">
        <div>
          <div className="nav_brand">
            <Link to={"/"}>
              <FiCodesandbox color="#fff" size={30} />
            </Link>
          </div>
          <ul>
            <li>
              <Link
                to={"/"}
                className="nav_link active"
                onClick={handleClickActive}
              >
                <MdOutlineDashboard size={20} />

                <span className="nav_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/customers"}
                className="nav_link"
                onClick={handleClickActive}
              >
                <TbBrandGoogleAnalytics size={20} />
                <span className="nav_name">Khách Hàng</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/products"}
                className="nav_link"
                onClick={handleClickActive}
              >
                <FaProductHunt size={20} />
                <span className="nav_name">Sản phẩm</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/orders"}
                className="nav_link"
                onClick={handleClickActive}
              >
                <AiFillEdit size={20} />
                <span className="nav_name">Orders</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/promotions"}
                className="nav_link"
                onClick={handleClickActive}
              >
                <FaSalesforce size={20} />
                <span className="nav_name">Khuyến mãi</span>
              </Link>
            </li>
          </ul>
        </div>

        <span className="nav_link logout" onClick={onLogout}>
          <IoIosLogOut size={20} />
        </span>
      </nav>
    </div>
  );
};

export default SideBar;
