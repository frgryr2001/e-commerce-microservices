import React, { useEffect, useMemo } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import Routes from "../routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.status);
  useMemo(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {isLoading === "loading" && <div className="loading">Loading&#8230;</div>}
      {isLoading === "succeeded" && (
        <Route
          render={(props) => (
            <div>
              <Header {...props} />
              <div className="container">
                <div className="main">
                  <Routes />
                </div>
              </div>
              <Footer />
              <ProductViewModal />
            </div>
          )}
        />
      )}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Layout;
