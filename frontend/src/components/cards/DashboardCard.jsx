function DashboardCard({ title, value, color }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}>
      <h2 className="text-gray-500 text-sm font-medium">
        {title}
      </h2>

      <h1 className="text-3xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;