import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import TableHisPayment from "../components/TableHisPayment";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/history" component={TableHisPayment} />

      {/* login */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgotPassword" component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
