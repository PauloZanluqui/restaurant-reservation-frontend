import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
