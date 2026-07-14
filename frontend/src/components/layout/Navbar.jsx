import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const titles = {
    "/dashboard": "Dashboard",
    "/products": "Products",
    "/categories": "Categories",
    "/suppliers": "Suppliers",
    "/reports": "Reports",
  };

  const pageTitle = titles[location.pathname] || "SmartStock AI";

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">
        {pageTitle}
      </h2>

      <div>
        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>

    </div>
  );
}

export default Navbar;