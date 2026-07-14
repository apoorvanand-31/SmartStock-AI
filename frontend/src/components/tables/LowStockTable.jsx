function LowStockTable({ products }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Low Stock Products
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-green-600">
            🎉 Great! No low stock products.
          </h3>

          <p className="text-gray-500 mt-2">
            All inventory levels are above their reorder thresholds.
          </p>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Current Stock</th>
              <th className="p-3 text-left">Reorder Level</th>
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
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LowStockTable;