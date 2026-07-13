import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import api from "../../services/api";
import SalesChart from "../../components/charts/SalesChart";
import LowStockTable from "../../components/tables/LowStockTable";
import ForecastCard from "../../components/cards/ForecastCard";


function Dashboard() {
  const [stats, setStats] = useState(null);
  const [sales, setSales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const [
      statsRes,
      salesRes,
      lowStockRes,
      forecastRes,
    ] = await Promise.all([
      api.get("/dashboard", { headers }),
      api.get("/dashboard/sales", { headers }),
      api.get("/dashboard/low-stock", { headers }),
      api.get("/dashboard/forecast", { headers }),
    ]);
    setStats(statsRes.data.data);
    setSales(salesRes.data.data);
    setLowStock(lowStockRes.data.data);
    setForecast(forecastRes.data.data);

  } catch (error) {
    console.log(error);
  }
};

  if (!stats) {

    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }
  console.log(stats);
  console.log(sales);
  console.log(lowStock);
  console.log(forecast);

  return (
    <Layout>

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Products"
          value={stats.totalProducts}
          color="border-blue-500"
        />

        <DashboardCard
          title="Inventory"
          value={stats.totalInventory}
          color="border-green-500"
        />

        <DashboardCard
          title="Inventory Value"
          value={`₹ ${stats.inventoryValue.toLocaleString("en-IN")}`}
          color="border-purple-500"
        />

        <DashboardCard
          title="Low Stock"
          value={stats.lowStockCount}
          color="border-red-500"
        />
        

      </div>
      <SalesChart data={sales} />
      <LowStockTable products={lowStock} />
      <ForecastCard forecast={forecast} />

    </Layout>
  );
}

export default Dashboard;