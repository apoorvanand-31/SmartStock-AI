import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        SmartStock AI
      </div>

      <nav className="flex flex-col p-4 gap-2">

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

    </div>
  );
}

export default Sidebar;