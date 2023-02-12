import React from "react";
import { Routes, Route } from "react-router-dom";
import RequiredAuth from "./components/requireAuth";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/Profile/profile";
import { SignUp } from "./pages/signUp/signUp";
import { Tracker } from "./pages/tracker/tracker";
import { Trending } from "./pages/trending/trending";

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
        <Route path="/home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
