import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import DashboardCard from "../../components/cards/DashboardCard";
import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data.data);
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
          value={`₹ ${stats.inventoryValue}`}
          color="border-purple-500"
        />

        <DashboardCard
          title="Low Stock"
          value={stats.lowStockCount}
          color="border-red-500"
        />

      </div>

    </Layout>
  );
}

export default Dashboard;