import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import api from "../../services/api";

function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);

      if (response.data.length > 0) {
        setSelectedProduct(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch forecast for selected product
  const fetchForecast = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/forecast/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForecast(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchForecast(selectedProduct);
    }
  }, [selectedProduct]);

  if (!forecast) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Demand Forecast" />

      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Select Product
        </label>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border rounded-lg p-3 w-72"
        >
          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* No sales history */}
      {forecast.message ? (
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            {forecast.product}
          </h2>

          <p className="text-gray-700">
            Current Stock: <strong>{forecast.currentStock}</strong>
          </p>

          <p className="mt-4 text-yellow-700 font-medium">
            ⚠ {forecast.message}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Product</p>
              <h2 className="text-2xl font-bold">
                {forecast.product}
              </h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Current Stock</p>
              <h2 className="text-2xl font-bold">
                {forecast.currentStock}
              </h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Average Daily Sales</p>
              <h2 className="text-2xl font-bold">
                {forecast.averageDailySales}
              </h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Expected Demand (7 Days)</p>
              <h2 className="text-2xl font-bold text-blue-600">
                {forecast.expectedDemand}
              </h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Days Until Out Of Stock</p>
              <h2 className="text-2xl font-bold text-red-500">
                {forecast.daysUntilOutOfStock ?? "N/A"}
              </h2>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500">Historical Data Used</p>
              <h2 className="text-2xl font-bold">
                {forecast.daysOfData} Days
              </h2>
            </div>

          </div>

          <div className="bg-white shadow rounded-xl p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">
              Predicted Sales (Next 7 Days)
            </h3>
            <div className="bg-white shadow rounded-xl p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">
                    Recommendation
                </h3>

                {forecast.daysUntilOutOfStock !== null &&
                forecast.daysUntilOutOfStock <= 7 ? (
                    <p className="text-red-600 font-bold">
                        ⚠ Reorder recommended soon.
                    </p>
                ) : (
                    <p className="text-green-600 font-bold">
                        ✅ Current stock is sufficient.
                    </p>
                )}
            </div>

            <div className="flex gap-3 flex-wrap">
              {forecast.predictedNext7Days.map((value, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Day {index + 1}: {value}
                </div>
              ))}
            </div>
          </div>

          {forecast.warning && (
            <div className="mt-6 bg-yellow-100 border border-yellow-400 rounded-xl p-4">
              <p className="text-yellow-700">
                ⚠ {forecast.warning}
              </p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default Forecast;