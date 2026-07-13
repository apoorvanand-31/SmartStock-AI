import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import api from "../../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow p-6">

        <PageHeader title="Suppliers">
          <Button>+ Add Supplier</Button>
        </PageHeader>

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b">
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">{supplier.phone}</td>
                <td className="p-3">{supplier.address}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </Layout>
  );
}

export default Suppliers;