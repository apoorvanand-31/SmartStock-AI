import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import Button from "../common/Button";

function AddProductModal({ isOpen, onClose, fetchProducts,editProduct=null }) {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      fetchDropdowns();
          if (editProduct) {
      reset({
        name: editProduct.name,
        sku: editProduct.sku,
        barcode: editProduct.barcode,
        price: editProduct.price,
        quantity: editProduct.quantity,
        reorderLevel: editProduct.reorderLevel,
        categoryId: editProduct.categoryId,
        supplierId: editProduct.supplierId,
      });
    } else {
      reset();
    }
    }
  }, [isOpen,editProduct]);

  const fetchDropdowns = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [categoryRes, supplierRes] = await Promise.all([
        api.get("/categories", { headers }),
        api.get("/suppliers", { headers }),
      ]);

      setCategories(categoryRes.data);
      setSuppliers(supplierRes.data);
    } catch (error) {
      console.error(error);
    }
  };

const onSubmit = async (data) => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const payload = {
      name: data.name,
      quantity: Number(data.quantity),
      price: Number(data.price),
      reorderLevel: Number(data.reorderLevel),
      categoryId: Number(data.categoryId),
      supplierId: Number(data.supplierId),
    };

    if (editProduct) {
      await api.put(
        `/products/${editProduct.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await api.post(
        "/products",
        {
          ...payload,
          sku: data.sku,
          barcode: data.barcode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    fetchProducts();
    onClose();
    reset();

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {editProduct ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >

          <input
            {...register("name")}
            placeholder="Product Name"
            className="border rounded-lg p-3"
          />

          <input
            {...register("sku")}
            placeholder="SKU"
            className="border rounded-lg p-3"
          />

          <input
            {...register("barcode")}
            placeholder="Barcode"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            {...register("quantity")}
            placeholder="Quantity"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            {...register("reorderLevel")}
            placeholder="Reorder Level"
            className="border rounded-lg p-3"
          />

          <select
            {...register("categoryId")}
            className="border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            {...register("supplierId")}
            className="border rounded-lg p-3"
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </option>
            ))}
          </select>

          <div className="col-span-2 flex justify-end gap-3 mt-4">

            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {loading ? "Saving..." : "Save Product"}
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddProductModal;