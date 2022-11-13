import React from "react";
import { useState, useRef } from "react";
import SideBar from "./SideBar";
import Content from "../Contents/Customers";
import classes from "./Layout.module.css";
function Layout() {
  // const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.body}>
      <Content></Content>
    </div>
  );
}

export default Layout;
