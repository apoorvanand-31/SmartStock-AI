function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">
        Dashboard
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