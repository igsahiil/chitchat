/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import isAuthenticated from "../utils/Auth";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";
import Profile from "../pages/Profile";
const ProtectedRoute = ({ element }) => {
  const isAuth = isAuthenticated();
  return isAuth ? element : <Navigate to="/login" />;
};

const RouteService = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default RouteService;
