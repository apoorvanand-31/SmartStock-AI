import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        SmartStock AI
      </div>

      <nav className="flex flex-col p-4 gap-2 flex-1">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `p-3 rounded transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-700"
          }`
        }
      >
        Dashboard
      </NavLink>
            <NavLink
        to="/products"
        className={({ isActive }) =>
          `p-3 rounded transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-700"
          }`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `p-3 rounded transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-700"
          }`
        }
      >
        Categories
      </NavLink>

      <NavLink
        to="/suppliers"
        className={({ isActive }) =>
          `p-3 rounded transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-700"
          }`
        }
      >
        Suppliers
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `p-3 rounded transition ${
            isActive
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-700"
          }`
        }
      >
        Reports
      </NavLink>
      <NavLink
  to="/forecast"
  className={({ isActive }) =>
    `p-3 rounded transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-700"
    }`
  }
>
  Forecast
</NavLink>


        



      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;