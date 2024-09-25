import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Route/PrivateRoute";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import EditProduct from "./Components/EditProduct";
import ViewProduct from "./Components/ViewProduct";
import ProductReport from "./Components/ProductReport";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id" element={<ViewProduct />} />
          <Route path="/products/report" element={<ProductReport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
