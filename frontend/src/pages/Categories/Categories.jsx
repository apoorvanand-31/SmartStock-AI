import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import api from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow p-6">

        <PageHeader title="Categories">
          <Button>+ Add Category</Button>
        </PageHeader>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Description
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr
                key={category.id}
                className="border-b"
              >

                <td className="p-3">
                  {category.name}
                </td>

                <td className="p-3">
                  {category.description}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </Layout>
  );
}

export default Categories;