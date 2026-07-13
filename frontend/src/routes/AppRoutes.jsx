import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Register/Register";
import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import Suppliers from "../pages/Suppliers/Suppliers";
import Reports from "../pages/Reports/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route
  path="/categories"
  element={<Categories />}
/>
<Route
  path="/suppliers"
  element={<Suppliers />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;