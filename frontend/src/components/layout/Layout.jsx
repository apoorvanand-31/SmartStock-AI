import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8 bg-gray-100 min-h-screen">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;