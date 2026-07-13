import { Link, useNavigate } from "react-router-dom";

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

        <Link to="/dashboard" className="p-3 rounded hover:bg-slate-700">
          Dashboard
        </Link>

        <Link to="/products" className="p-3 rounded hover:bg-slate-700">
          Products
        </Link>

        <Link to="/categories" className="p-3 rounded hover:bg-slate-700">
          Categories
        </Link>

        <Link to="/suppliers" className="p-3 rounded hover:bg-slate-700">
          Suppliers
        </Link>

        <Link to="/reports" className="p-3 rounded hover:bg-slate-700">
          Reports
        </Link>

        <Link to="/forecast" className="p-3 rounded hover:bg-slate-700">
          Forecast
        </Link>

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