import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auths/Login";

import Spinner from "./components/Layouts/Spinner";
import SideBar from "./components/Layouts/SideBar";
import Orders from "./components/Contents/orders/Orders";
import Customers from "./components/Contents/Customers";
import Promotion from "./components/Contents/Promotion/Promotion";

import Dashboard from "./components/Contents/Dashboard";
import Products from "./components/Product/Products";
function App() {
  return (
    <>
      <Router>
        <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/promotions" element={<Promotion />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;