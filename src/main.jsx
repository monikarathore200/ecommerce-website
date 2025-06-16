import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Product from "./components/Product.jsx";
import Home from "./components/Home.jsx";
import AboutUs from "./components/AboutUs.jsx";
import RootLayout from "./components/RootLayout.jsx";
import ProductDetail from "./components/common/ProductDetail.jsx";
import Context from "./ContextApi/Context.jsx";
import ViewCart from "./components/ViewCart.jsx";
import LoginRegister from "./components/LoginRegister.jsx";
import WishList from "./components/WishList.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/product/:slug?/:sub_slug?" element={<Product />} />
         <Route path="/product-details/:id" element={<ProductDetail />} />
         <Route path="/View-Carts" element={<ViewCart />} />
         <Route path="/login-Register" element={<LoginRegister />} />
          <Route path="/wishlist" element={<WishList/>} />

          
      </Route>
   
      <Route path="admin-panel">
        <Route path="category">
        <Route path="add" element={<AboutUs />} />
        <Route path="view" element={<AboutUs />} />
        <Route path="update" element={<AboutUs />} />
        </Route>

        <Route path="category/add" element={<AboutUs />} />
        <Route path="category/view" element={<AboutUs />} />
        <Route path="category/update" element={<AboutUs />} />
        <Route path="product/add" element={<AboutUs />} />
        <Route path="product/view" element={<AboutUs />} />
        <Route path="product/update" element={<AboutUs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
