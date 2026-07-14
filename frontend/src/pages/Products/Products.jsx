import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import AddProductModal from "../../components/products/AddProductModel";


function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Refresh the table
    fetchProducts();

    alert("Product deleted successfully!");
  } catch (error) {
    if (error.response?.status === 500) {
        alert(
            "This product cannot be deleted because it has inventory transactions."
        );
    } else {
        alert(error.response?.data?.message || "Failed to delete product");
    }
  }
};

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow p-6">
        <PageHeader title="Products">
            <Button 
            onClick={()=>{
                setEditProduct(null);
                setIsModalOpen(true);
                }}
                >
                + Add Product
            </Button>
        </PageHeader>
      

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>
            

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">{product.name}</td>

                <td className="p-3">{product.sku}</td>

                <td className="p-3">
                  {product.category.name}
                </td>

                <td className="p-3">
                  {product.supplier.name}
                </td>

                <td className="p-3">
                  ₹ {product.price.toLocaleString("en-IN")}
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>
                <td className="p-3 flex gap-2">
                    <Button 
                        variant="success"
                        onClick={()=>{
                            setEditProduct(product);
                            setIsModalOpen(true);
                        }}
                        >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                    >
                        Delete
                    </Button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
    </div>
    <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            setEditProduct(null);
        }}
        fetchProducts={fetchProducts}
        editProduct={editProduct}
    />

      
    </Layout>
  );
}

export default Products;