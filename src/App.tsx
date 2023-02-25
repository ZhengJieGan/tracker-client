import React from "react";
import { Routes, Route } from "react-router-dom";
import RequiredAuth from "./components/requireAuth";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Shop } from "./pages/shop/shop";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/Profile/profile";
import { SignUp } from "./pages/signUp/signUp";
import { Cart } from "./pages/cart/cart";
import { Trending } from "./pages/trending/trending";
import ItemDetails from "./pages/itemDetails/itemDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
        }
      >
        <Route path="/shop" element={<Shop />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/item" element={<ItemDetails />} />
    </Routes>
  );
}

export default App;
